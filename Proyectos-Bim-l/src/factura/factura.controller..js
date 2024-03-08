'use strict'

import Factura from './factura.model.js'
import User from '../user/user.model.js'
import prodcuto from '../productos/productos.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running on factura')
    return res.send({ message: 'test of Bill ir running correct' })
}


// Crear una factura, verificar y actualizar el stock de los productos, y calcular el total de la factura
export const createFactura = async (req, res) => {
    try {
        // Obtener los datos necesarios de la solicitud
        const { userFactura, productos } = req.body;

        // Inicializar el total de la factura en 0
        let totalFactura = 0;

        // Verificar y actualizar el stock de los productos
        for (const item of productos) {
            // Obtener el producto de la base de datos
            const product = await Producto.findById(item.productos);

            // Verificar si el producto existe y hay suficiente stock
            if (!product || product.stock < item.cantidad) {
                return res.status(400).send({ message: 'Producto no disponible o cantidad insuficiente en stock' });
            }
            product.stock -= item.cantidad;
            await product.save();

            const subtotal = item.cantidad * item.unirPrecio;
            totalFactura += subtotal;
        }

        // Crear una nueva instancia de la Factura con los datos proporcionados y el total calculado
        const newInvoice = new Factura({
            userFactura,
            productos,
            total: totalFactura,
            deleteFactura: new Date() // Establecer la fecha de creación de la factura como la fecha y hora actual
        });


        await newInvoice.save();
        res.status(201).send({ message: 'Factura creada exitosamente', invoice: newInvoice });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al crear la factura' });
    }
};

// export const createBill = async (req, res) => {
//     try {
//         // Obtener los datos necesarios de la solicitud
//         const { userFactura, productos } = req.body;

//         // Verificar si el usuario existe
//         const user = await User.findById(userFactura);
//         if (!user) {
//             return res.status(404).send({ message: `Usuario no encontrado: ${userFactura}` });
//         }

//         // Verificar y actualizar el stock de los productos
//         for (const productData of productos) {
//             const { producto, cantidad } = productData;
//             const existingProduct = await Producto.findById(producto);
//             if (!existingProduct) {
//                 return res.status(404).json({ message: `Producto con ID ${producto} no encontrado` });
//             }
//             if (cantidad > existingProduct.stock) {
//                 return res.status(400).json({ message: `Stock insuficiente para el producto ${existingProduct.name}` });
//             }
//             existingProduct.stock -= cantidad;
//             await existingProduct.save();
//         }

//         // Calcular el total de la factura
//         let total = 0;
//         for (const productData of productos) {
//             const { cantidad, unirPrecio } = productData;
//             total += cantidad * unirPrecio;
//         }

//         // Crear la factura
//         const newBill = new Factura({
//             userFactura,
//             productos,
//             total,
//             deleteFactura: new Date() // Establecer la fecha de creación de la factura como la fecha y hora actual
//         });

//         // Guardar la factura en la base de datos
//         await newBill.save();

//         // Respuesta exitosa
//         return res.status(201).send({ message: 'Factura creada exitosamente', bill: newBill });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Error al crear la factura' });
//     }
// };

'use strict'


import Carrito from './carrito.model.js'; // Importa el modelo del Carrito de Compras
import Producto from '../productos/productos.model.js'; // Importa el modelo del Producto

// Controlador para agregar un producto al carrito de compras
export const agregarAlCarrito = async (req, res) => {
    try {
        // Captura los datos del producto a agregar del cuerpo de la solicitud
        const { productoId, cantidad, subTotal } = req.body;

        // Verifica si el producto está disponible en el inventario
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Verifica si el carrito de compras del usuario ya existe
        // Si no existe, crea un nuevo carrito
        let carrito = await Carrito.findOne({ user: req.user._id }); // Suponiendo que estás utilizando autenticación de usuario

        if (!carrito) {
            carrito = new Carrito({ user: req.user._id, productos: [], Total: 0 });
        }

        // Verifica si el producto ya está en el carrito
        const indiceProducto = carrito.poductos.findIndex(item => item.productos.toString() === productoId);
        if (indiceProducto !== -1) {
            // Si el producto ya está en el carrito, simplemente actualiza la cantidad y el subtotal
            carrito.poductos[indiceProducto].cantidad += cantidad;
            carrito.poductos[indiceProducto].subTotal += subTotal;
        } else {
            // Si el producto no está en el carrito, lo agrega
            carrito.productos.push({ producto: productoId, cantidad, subTotal });
        }

        // Calcula el nuevo total del carrito
        carrito.Total += subTotal;

        // Guarda el carrito de compras actualizado en la base de datos
        await carrito.save();

        // Devuelve una respuesta exitosa indicando que el producto ha sido agregado al carrito
        return res.status(200).send({ message: 'Producto agregado al carrito de compras' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al agregar el producto al carrito de compras' });
    }
};

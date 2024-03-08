'use strict'

import Categoria from '../categoria/categoria.model.js'
import Producto from './productos.model.js'

export const testProducto = (req,res)=>{
    console.log('test')
    return res
    .send({message: 'Esta corriendo correctamente'})
};

// Controlador para agregar un nuevo producto
export const addProducto = async (req, res) => {
    try {
        // Se capturan los datos del producto del cuerpo de la solicitud
        let data = req.body;

        // Se busca la categoría asociada al producto en la base de datos
        let Categoria = await Categoria.findOne({ _id: data.Categoria });

        // Si la categoría no existe, se devuelve un mensaje de error
        if (!Categoria) {
            return res.status(404).send({ message: "La categoría no existe" });
        }

        // Se crea una nueva instancia del modelo Producto con los datos proporcionados
        let newProducto = new Producto(data);

        // Se guarda el nuevo producto en la base de datos
        await newProducto.save();

        // Se devuelve una respuesta exitosa indicando que el producto ha sido agregado a la tienda
        return res.status(200).send({ message: `Se agregó ${newProducto.name} a la tienda` });
    } catch (error) {
        // En caso de error, se devuelve un mensaje de error al cliente
        res.status(500).send({ error: 'No se puede agregar el producto' });
    }
};


// Controlador para obtener el catálogo completo de productos
export const obtenerCatalago = async(req,res)=>{
    try {
        let data = await Producto.find().populate('categoria')
        return res.send({ data })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'the information cannot be brought' })
    }
};


// Controlador para obtener un producto individual por su ID
export const obtenerProducto = async (req, res) => {
    try {
        // Captura el ID del producto de los parámetros de la solicitud
        let { id } = req.params;

        // Busca el producto por su ID en la base de datos
        let Producto = await Producto.findById(id);

        // Si no se encuentra el producto, devuelve un mensaje de error
        if (!Producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Devuelve el producto encontrado
        res.send({ Producto });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener el producto' });
    }
};

// Controlador para actualizar los detalles de un producto por su ID
export const actualizarProducto = async (req, res) => {
    try {
        // Captura el ID del producto y los datos actualizados del cuerpo de la solicitud
        let { id } = req.params;
        let updatedData = req.body;

        // Actualiza el producto con los nuevos datos en la base de datos
        let updatedPoducto = await Producto.findByIdAndUpdate(id, updatedData, { new: true });

        // Si no se encuentra el producto, devuelve un mensaje de error
        if (!updatedPoducto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Devuelve una respuesta exitosa indicando que el producto ha sido actualizado
        res.send({ message: 'Producto actualizado correctamente', Producto: updatedPoducto });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar el producto' });
    }
};

// Controlador para eliminar un producto por su ID
export const eliminarProducto = async (req, res) => {
    try {
        let { id } = req.params;
        // Verificamos si el categoryId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid category ID' });
        }
        // Buscamos los productos que pertenecen a la categoría especificada
        let products = await Product.find({ category: id });
        return res.status(200).send(products);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving products by category', error: error });
    }
};
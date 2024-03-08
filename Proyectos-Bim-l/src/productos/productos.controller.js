'use strict'

import Categoria from '../categoria/categoria.model.js'
import Producto from './productos.model.js'

export const testProducto = (req,res)=>{
    console.log('test is running')
    res.send({message: 'prueba buena'})
};

// Controlador para agregar un nuevo producto
export const addProducto = async (req, res) => {
    try {
        // Extraer los datos del producto del cuerpo de la solicitud
        const { name, price, description, stock, categoria } = req.body;

        // Verificar si la categoría existe
        const categoriaExistente = await Categoria.findById(categoria);
        if (!categoriaExistente) {
            return res.status(404).send({ message: 'La categoría especificada no existe' });
        }

        // Crear un nuevo producto y asignar la categoría
        const nuevoProducto = new Producto({
            name,
            price,
            description,
            stock,
            categoria: categoriaExistente._id // Asignar el ID de la categoría existente
        });

        // Guardar el nuevo producto en la base de datos
        const productoGuardado = await nuevoProducto.save();

        // Devolver el producto guardado como respuesta
        res.status(201).send({ producto: productoGuardado });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al agregar el producto' });
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
        let Productos = await Producto.find({ Categoria: id });
        return res.status(200).send(Productos);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving products by category', error: error });
    }
};
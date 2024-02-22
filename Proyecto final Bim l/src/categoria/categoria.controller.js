'use strict'

const Categoria = require('../categoria/categoria.model'); // Importar el modelo de Categoria

// Controlador para obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener las categorías');
    }
};

// Controlador para obtener una categoría por su ID
export const obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener la categoría');
    }
};

// Controlador para crear una nueva categoría
export const crearCategoria = async (req, res) => {
    try {
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al crear la categoría');
    }
};

// Controlador para actualizar una categoría por su ID
export const actualizarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        let categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        categoria.nombre = nombre;

        await categoria.save();

        res.json({ msg: 'Categoría actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar la categoría');
    }
};

// Controlador para eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        await Categoria.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar la categoría');
    }
};

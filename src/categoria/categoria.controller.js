'use strict'

import { checkUpdate } from '../utils/validator.js'
//import { checkUpdate } from '../utils/validator.js'
import Categoria from './categoria.model.js'
import jwt   from 'jsonwebtoken'


//Categoria de pruba
export const testCategoria = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'prueba buena' })
}




export const add = async (req, res) => {
    try {
        // Extrae el nombre y la descripción de la categoría del cuerpo de la solicitud
        const { nombre, descripcion } = req.body;

        // Verifica si ya existe una categoría con el mismo nombre o descripción en la base de datos
        const existingCategory = await Categoria.findOne(
            { 
                $or: [{ nombre }, { descripcion }] 
            });

        // Si existe una categoría con el mismo nombre o descripción, devuelve un error
        if (existingCategory) {
            return res.status(400).send({ message: 'A category with the same name or description already exists.' });
        }

        // Si no existe, crea una nueva instancia del modelo Categoria con los datos enviados
        const newCategory = new Categoria({
                nombre, 
                descripcion 
            });

        // Guarda la nueva categoría en la base de datos
        await newCategory.save();

        // Envía una respuesta de éxito con la categoría recién creada
        res.status(201).send({ newCategory });
    } catch (error) {
        // En caso de error, captura y envía una respuesta de error interno del servidor
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};


// Controlador para obtener todas las categorías
export const obtenerTodasCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().select('nombre'); // Solo obtén el campo 'nombre'
        const categoriasList = categorias.map(categoria => categoria.nombre);
        res.status(200).send(categoriasList);
    } catch (error) {
        console.error(error); // Agregar un log del error puede ser útil para la depuración
        res.status(500).send({ message: 'Internal server error when getting categories' });
    }
};


// export const loginCategoria = async (req, res) =>{
//     try {
//         if(user && (await che))
//     }catch{
//         console.error(err);
//         return res.status(500).send({ message: "Error to login" });
//     }
// }


// // Controlador para obtener una categoría por su ID
// export const obtenerCategoriaPorId = async (req, res) => {
//     try {
//         const categoria = await Categoria.findById(req.params.id);
//         if (!categoria) {
//             return res.status(404).send({ error: 'Categoría no encontrada' });
//         }
//         res.status(200).send(categoria);
//     } catch (error) {
//         res.status(500).send({ message: 'Error interno del servidor al obtener categoría por ID' });
//     }
// };


// Controlador para actualizar una categoría por su ID
export const update = async (req, res) => {
    try {
        // Captura los datos enviados en el cuerpo de la solicitud y el ID de la categoría a actualizar
        let data = req.body;
        let { id } = req.params;

        // Verifica si hay datos válidos para actualizar y si se han cambiado campos significativos
        let update = checkUpdate(data, false);
        if (!update) {
            // Si no hay datos válidos para actualizar o no se han cambiado campos, devuelve una advertencia
            return res.status(400).send({ message: 'No valid data provided or no fields have been changed' });
        }

        // Actualiza la categoría con los datos proporcionados
        let updatedCategory = await Categoria.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeper', 'nombre', 'descripcion');

        if (!updatedCategory) {
            // Si no se encuentra la categoría a actualizar, devuelve un mensaje de error
            return res.status(404).send({ message: 'Category not found, not updating' });
        }

        // Devuelve una respuesta exitosa junto con la categoría actualizada
        return res.send({ message: 'Category successfully updated', updatedCategory });
    } catch (error) {
        // En caso de error, imprime el error en la consola y devuelve un mensaje de error al cliente
        console.error(error);
        return res.status(500).send({ message: 'Internal server error when updating category' });
    }
};


// Controlador para eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
    try {
        const categoriaEliminada = await Categoria.findByIdAndRemove(req.params.id);
        if (!categoriaEliminada) {
            return res.status(404).send({ error: 'Categoría no encontrada para eliminar' });
        }
        res.status(200).send({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error interno del servidor al eliminar categoría' });
    }
};
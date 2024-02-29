'use strict'
//import { checkUpdate } from '../utils/validator.js'
import Categoria from './categoria.model.js'


//Categoria de pruba
export const testCategoria = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'prueba buena' })
}

//Agregar

export const add = async (req, res) => {
    try {
        const categories = await Categoria.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
}

//Obtener un acategoria por su ID
export const obtenerCategoriaId = async(req, res)=>{
    try{
        const categoria = await Categoria.findById(req.params.id);
        if(!categoria){
            return res.status(404).send({error: 'categoria no encrontrada'});
        }
        res.status(300).send(categoria);
    }catch(error){
        res.status(500).send({message: 'Error interno del servidor'});
    }
}

//Se crea una categoria
export const createCategoria = async (req, res) => {
    try {
        const newCategoria = new Categoria(req.body);
        await newCategoria.save();
        res.status(201).send(newCategoria);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}

//Actualizacion de categoria
export const updateCategoria = async(req, res) =>{
    try{
        const updateCategoria = await Categoria.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!updateCategoria){
            return res.status(404).send({message: 'categoria no encontrada'})
        }
    }catch(error){
        res.status(500).send({message: 'Internal server error'})
    }
}


// export const update = async (req, res) => {
//     try {
//         let data = req.body
//         let { id } = req.params
//         let update = checkUpdate(data, id)
//         if (update === false) return res.status(400).send({ message: 'enter all data' })
//         let updateCat = await Category.findOneAndUpdate(
//             { _id: id },
//             data,
//             { new: true }
//         )
//         if (!updateCat) return res.status(401).send({ message: 'Category not found and not updated' })
//         return res.send({ message: 'Updated category', updateCat })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'error updating' })

//     }
// }
// Eliminar una categoría
export const deleteCategoria = async (req, res) => {
    try {
        const deleteCategoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!deleteCategoria) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.status(200).send(deleteCategoria);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}




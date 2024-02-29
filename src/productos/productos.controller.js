'use strict'

import Producto from './productos.model.js'
import Categoria from '../categoria/categoria.model.js'


export const testProducto = (req,res)=>{
    console.log('test')
    return res
    .send({message: 'Esta corriendo correctamente'})
}

//Obtener los productos
export const obtenerProductos= async(res, req)=>{
    try{
        const producto= await Producto.find();
        res.status(200).send(producto);
    }catch(error){
        res.status(500).send({message: 'no se pueden ver los productos'})
    }
}

//Obtener los productos por el id
export const obtenerProductosId = async(req,res)=>{
    try{
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            return res.status(404).send({message: 'Producto no encontrado'})
        }
        res.status(200).send(producto);
    }catch(err){
        res.status(500).send({message: 'El producto no fue enconttrado'})
    }
}

//Se crea un nuevo producto
export const crearProducto = async (req, res) => {
    try {
      let data = req.body
      let categoria = await Categoria.findOne({ _id: data.categoria });
      if (!categoria) return res.status(404).send({message: "La categotia no existe"})
      let newProducto = new Producto(data);
      await newProducto.save();
      return res.status(200).send({message: `Se agrego ${newProducto.name} 
      ¡a la tienda!`});
    } catch (error) {
      res.status(500).send({ error: 'No se puede agregar el producto' });
    }
}

//Actualización del producto
export const actualizaProdcuto = async (req,res)=>{
    try{
        let actualizaProdcuto = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!actualizaProdcuto){
            return res.status(404).send({message: 'Producto no encontrado'});
        }
        res.status(200).send(actualizaProdcuto);
    }catch(err){
        res.status(500).send({Message: 'No se pudo actualizar el producto'})
    }
}


//Eliminar
export const eliminarProducto = async (req,res)=>{
    try{    
        let eliminarProducto = await Producto.findByIdAndDelete(req.params.id);
        if(!eliminarProducto){
            return res.status(404).send({message: 'Producto no encontrado'});
        }
        res.status(200).send(eliminarProducto);
    }catch(err){
        res.status(500).send({message: 'Nose pudo eliminar ell producto'});
    }
}
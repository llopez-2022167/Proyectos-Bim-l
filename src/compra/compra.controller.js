'use strict'

//import { compare } from 'bcrypt';
//import Compras from '../compras/'; // Importa el modelo de Orden de Compra

import compra from '../compra/compra.model.js'; // Importa el modelo de la Orden de Compra
import Productos from '../productos/productos.model.js'


// Crear una Orden de Compra
export const add = async (req, res) => {
    try {
        let data = req.body;
        data.user = req.user._id
      
        //Verificar que el producto exista
        console.log("Product ID:", typeof(data.Productos));
        console.log("User ID", typeof(data.user));
        let producto = await Productos.findOne({_id: data.producto});
        let stock = producto.stock;
        if (!producto) return res.status(404).send({message: 'product not found'})
        if (stock === 0) return res.status(404).send({message: 'we dont have this product right now'});
        //Guardar
        let compra = new compra(data)
        let amount = compra.amount
        let stockAfter = stock-amount;
        //validacion para restar productos que se quieran comprar
        if(stock < amount) return res.send({ message: 'No existe la cantidad requerida'})
        //guardar
        await compra.save()
        return res.send({message: `Purchase successfully, for the date ${compra.date}`})
    } catch (error) {
        // En caso de error, enviar una respuesta de error al cliente
        console.error(error);
        res.status(500).send({ message: 'Error al crear la orden de compra' });
    }
};

export const getCompra = async(req, res)=>{
    try {
        //Encontrar la info 
        let compra = await compra.find()
        //retornar todos los valores
        return res.send({ compra })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No Purchases or error Getting purchases'})
    }
}




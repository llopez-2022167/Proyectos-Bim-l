'use strict'

//Importación de Base de datos Mongoose
//const mongoose = require('mongoose');
import { Schema , model} from "mongoose"; 
//Definicion para el modelo de producto
const productoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    }
},{
    versionKey: false
});

//Definicion modelo para el producto
export default model('Producto', productoSchema);

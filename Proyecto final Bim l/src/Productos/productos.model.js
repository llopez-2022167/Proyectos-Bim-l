'use strict'

//Importación de Base de datos Mongoose
const mongoose = require('mongoose');

//Definicion para el modelo de producto
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required:true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
});

//Definicion modelo para el producto
const producto = mongoose.model('Producto', productoSchema);

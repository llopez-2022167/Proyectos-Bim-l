'use strict'

import { Schema , model} from "mongoose"; 

const productoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    price: {
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
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    }
},{
    versionKey: false
});

//Definicion modelo para el producto
export default model('productos', productoSchema);

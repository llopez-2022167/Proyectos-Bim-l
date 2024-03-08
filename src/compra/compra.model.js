'use strict'

import { Schema , model} from "mongoose"; 

const productoSchema = Schema({
    fecha: {
        type : Date,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['CREATED', 'CANCELLED', 'COMPLETED'],
        default: 'CREATED',
        required: true
    },
    productos: {
        type: Schema.ObjectId,
        ref: 'product',
        required: true
       
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
        
    },
},{
    versionKey: false
});

//Definicion modelo para el producto
export default model('Productos', productoSchema);

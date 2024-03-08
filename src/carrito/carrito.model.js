'use strict'

//import { Router } from 'express'; na que ver pensando que era el routes
import { Schema, model } from 'mongoose';

const carritoSchema = new Schema({
    user: {//// Referencia al usuario que posee el carrito
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    poductos: [
        {
            productos: {//// Referencia al producto en el carrito
                type: Schema.Types.ObjectId,
                ref: 'productos',
                required: true
            },
            cantidad: { //// Cantidad del producto en el carrito
                type: Number,
                default: 1,
                required: true
            },
            precio: {
                type: Number,
                required: true
            },
            subTotal: {
                 type: Number,
                required: true
            }    
        }
    ],
    Total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
},{
    verionKey: false
});

export default model('carrito', carritoSchema)
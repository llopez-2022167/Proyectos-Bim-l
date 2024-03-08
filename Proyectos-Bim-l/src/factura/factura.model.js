'use strict'

import { Schema ,model} from 'mongoose'

const facturaSchema = Schema({
    deleteFactura:{
        type: Date,
        default: Date.now,
        required: true
    },
    userFactura: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productos: [
       {
            productos: {
                type: Schema.Types.ObjectId,
                ref: 'prodcutos',
                required : true
            },
            cantidad: {
                type: Number,
                required: true
            },
            unirPrecio: {
                type: Number,
                required: true
            },
            subTotal: {
                type: Number,
                required: true 
            }
       }
    ],
    total: {
        type: Number, 
        required: true 
    }
}, {
    versionKey: false //desactivar el _v (versión del documento)
})

export default model('factura', facturaSchema)
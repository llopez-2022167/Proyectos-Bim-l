'use strict'

import {Schema, model} from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: [8, 'La contraseña debe tener 8 caracteres.'],
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        require: true
    },

    //categorias: [{
      //  type: mongoose.Schema.Types.ObjectId,
        //ref: 'Categoria'
    //}]
},{
    versionKey: false
});

export default model('user', userSchema)
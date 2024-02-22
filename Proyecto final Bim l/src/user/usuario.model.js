'use strict'

const { default: mongoose } = require("mongoose")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rol:{
        type: String,
        enum: ['ADMIN', 'CLIENT'],
        default: 'CLIENT'
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);

//export default mongoose.model('Usuario', usuarioSchema);
import mongoose from "mongoose"


//const { default: mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
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
    rol:{
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        require: true
    },
    //categorias: [{
      //  type: mongoose.Schema.Types.ObjectId,
        //ref: 'Categoria'
    //}]
});

export default mongoose.model('user', userSchema)

//export default mongoose.model('Usuario', usuarioSchema);
import { Schema,model } from "mongoose"

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
},{
    versionKey: false
});

export default model('Categoria', categoriaSchema);

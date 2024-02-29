import express from "express"

//UImportar el controlador de categorias
import {
    testCategoria,
    add,
    obtenerCategoriaId, 
    createCategoria,
    updateCategoria,
    deleteCategoria
} from "./categoria.controller.js"
import { isAdmin, validateJwt } from '../middleware/validate-jwt.js'


const api = express.Router();

//Rutas publicass
api.get('/add', add);
api.get('/obtenerCategoriaId/:id',obtenerCategoriaId);

//Rutas privadas protegidas por middleware
api.get('testCategoria', [validateJwt] ,testCategoria);
api.post('/createCategoria', [validateJwt, isAdmin] ,createCategoria);
api.put('/updateCategoria/:id', [validateJwt, isAdmin] ,updateCategoria);
api.delete('/deleteCategoria/:id', [validateJwt, isAdmin], deleteCategoria)
//Obtener todas las categorias

export default api

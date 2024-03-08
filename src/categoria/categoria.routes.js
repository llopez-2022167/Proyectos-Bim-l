'use strict'

import { Router } from "express"
import {
    testCategoria,
    add,
    obtenerTodasCategorias,
    //obtenerCategoriaPorId,
    update,
    eliminarCategoria
} from './categoria.controller.js'
import {isAdmin,validateJwt} from '../middleware/validate-jwt.js'


const api= Router();

//Rutas Publicas
api.post('/add', add)
api.post('/categorias', obtenerTodasCategorias)

//Rutas privadas
api.get('/testCategoria'[validateJwt], testCategoria)
//api.post('/CategoriaPorId/:id'[validateJwt, isAdmin],obtenerCategoriaPorId)
api.put('/update/:id'[validateJwt, isAdmin], update)
api.delete('/eliminarCategoria'[validateJwt,isAdmin], eliminarCategoria)

export default api;


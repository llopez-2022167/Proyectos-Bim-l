'use strict'

import { Router } from "express"
import {
    testCategoria,
    add,
    obtenerCategoriaId,
    createCategoria,
    updateCategoria,
    deleteCategoria
} from './categoria.controller.js'
import {isAdmin,validateJwt} from '../middleware/validate-jwt.js'


const api= Router();

//Rutas Publicas
api.post('/add', add)
api.post('/obtenerCategoriaId:/id', obtenerCategoriaId)

//Rutas privadas
api.get('/testCategoria'[validateJwt], testCategoria)
api.post('/createCategoria'[validateJwt, isAdmin],createCategoria)
api.put('/updateCategoria'[validateJwt, isAdmin], updateCategoria)
api.delete('/deleteCategoria'[validateJwt,isAdmin], deleteCategoria)

export default api;


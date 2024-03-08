'use strict'

import  {Router} from "express"

import {
    testProducto,
    addProducto,
    obtenerCatalago,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}from "./productos.controller.js"

import { isAdmin, validateJwt } from "../middleware/validate-jwt.js"

const api = Router();

//Rutas Publicas
api.post('/addProducto',addProducto);
api.post('/obtenerCatalago', obtenerCatalago);
api.post('/obtenerProducto/:id', obtenerProducto)
api.get('/testProducto'[validateJwt], testProducto);
api.put('/actualizarProducto/:id'[validateJwt, isAdmin], actualizarProducto);
api.delete('/eliminarProducto/:id'[validateJwt, isAdmin] ,eliminarProducto);

export default api;




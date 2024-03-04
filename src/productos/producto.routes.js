'use strict'

import  {Router} from "express"

import {
    testProducto,
    obtenerProductos,
    obtenerProductosId,
    crearProducto,
    actualizaProdcuto,
    eliminarProducto
}from "./productos.controller.js"

import { isAdmin, validateJwt } from "../middleware/validate-jwt.js"

const api = Router();

//Rutas Publicas
api.post('/obtenerProductos',obtenerProductos);
api.post('/obtenerProductosId/:id', obtenerProductosId);

//Rutas privasas 
api.get('/testProducto'[validateJwt], testProducto);
api.post('/crearProducto'[validateJwt, isAdmin], crearProducto);
api.put('/actualizaProdcuto/:id'[validateJwt, isAdmin], actualizaProdcuto);
api.delete('/eliminarProducto/:id'[validateJwt, isAdmin] ,eliminarProducto);

export default api;




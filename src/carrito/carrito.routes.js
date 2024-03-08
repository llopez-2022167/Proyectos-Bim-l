'use strict'

import { Router } from "express";   

import { agregarAlCarrito } from "./carrito.    controller.js";
import {isAdmin, validateJwt} from '../middleware/validate-jwt.js'

const api = Router()

api.post('/agregarAlCarrito'[isAdmin, validateJwt], agregarAlCarrito)

export default api;
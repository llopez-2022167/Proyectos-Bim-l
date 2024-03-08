'use strict'

import { Router } from 'express'
import {
    add, getCompra
} from './compra.controller.js'
import { isClient, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

//Rutas privadas para cliente
api.post('/add', [validateJwt], isClient, add)
api.get('/getCompra', [validateJwt], isClient, getCompra)

export default api
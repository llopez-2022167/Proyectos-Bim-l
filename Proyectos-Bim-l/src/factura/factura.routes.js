'use strict'

import { Router } from "express"
import {createFactura, test} from './factura.model.js'

const api = Router()

api.get('/test', test)
api.post('/createFactura', createFactura)

export default api;
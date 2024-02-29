import express from 'express';
import { test, registerUser, loginUser, update, deleteU } from './usuario.controller.js';
import { validateJwt, isAdmin}from '../middleware/validate-jwt.js';

const api = express.Router();

//Middleeare

//Rutas Ppublicas
api.post('/registerUser', registerUser)
api.post('/loginUser', loginUser)
//Privadas
api.get('/test', [validateJwt, isAdmin],test)
api.put('/update/:id', [validateJwt], update)
api.delete('/deleteU/:id', [validateJwt, isAdmin], deleteU)

export default api
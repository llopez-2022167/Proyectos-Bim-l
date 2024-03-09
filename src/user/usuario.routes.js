import {Router} from 'express';
import { test, registerUser, loginUser, updateUser, deleteU } from './usuario.controller.js';
import { validateJwt, isAdmin}from '../middleware/validate-jwt.js';

const api = Router();

//Middleeare

//Rutas Ppublicas
api.post('/registerUser', registerUser)
api.post('/loginUser', loginUser)
//Privadas
api.get('/test', [validateJwt, isAdmin],test)
api.put('/updateUser/:id', [validateJwt], updateUser)
api.delete('/deleteU/:id', [validateJwt, isAdmin], deleteU)

export default api
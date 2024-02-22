import express from 'express'
import { 
    validateJwt,
    isAdmin 

} from '../middlewares/validate-jwt.js'; 
import { test, registrUser, loginUser, update, deleteU } from './user.controller.js';

const api = express.Router();

//Middleeare

//Rutas Ppublicas
api.post('/registrUser', registrUser)
api.post('/loginUser', loginUser)

//Rutas Privadas (Solo usuarios logeados)
                //Middleaware
api.get('/test',[validateJwt] , test)
api.put('/update/:id',[validateJwt] ,update)//MiddLeware -> Funciones intermedias que sirevne para validar.
api.delete('/delete/:id',[validateJwt], deleteU)

export default api
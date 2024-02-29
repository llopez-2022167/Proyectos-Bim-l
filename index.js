//La ejecución de los servicios
import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"
//import { userDefect } from "../ProyectoFinalBimOne/src/user/usuario.controller.js"

//userDefect()
initServer()
connect()
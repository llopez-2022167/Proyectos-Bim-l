//La ejecución de los servicios
import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"

//userDefect()
initServer()
connect()
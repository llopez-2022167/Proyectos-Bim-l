  "use strict"; //Metodo estricto

import User from "./usuario.model.js"; //Importando el modelo de usuario
import { encrypt, checkPassword, checkUpdate } from "../utils/validator.js";
import { generateJwt } from "../utils/jwt.js";
import Factura from "../factura/factura.model.js"

//El controlador para crear un nuevo usuario
export const test = (req, res) => {
  console.log("la prueba se está ejecutando");
  return res.send({ message: "la prueba se está ejecutando" });
};

let defaultAdmin= {
  name: 'Lisandro López',
  username: 'llopez-2022167',
  password: 'Guatemala',
  email: 'llopez-2022167@kinal.edu.gt',
  role: 'ADMIN'
}

export const adminDafult = async(req, res)=>{
  try{
    let admin = await User.findOne({username: defaultAdmin.username});
    if(admin){
      console.log('This admin is already exist')
    }else{
      defaultAdmin.password = await encrypt(defaultAdmin.password)
      let newAdmin = await User.create(defaultAdmin)
      console.log(`A default admin is create, can be logged with user: ${newAdmin.username}`)
    }
  }catch(err){
    console.error(err)
    return res.status(500).send({ message: 'Error registering user' })
  }
}


export const registerUser = async (req, res) => {
  try {
    //Captura del boosy en el forulario en el (Body)
    let data = req.body;
    //Encriptar la contraseña
    data.password = await encrypt(data.password);
    //Asignar el rol por defecto
    data.role = "CLIENT";
    //Guardar la informacion en la base de datos
    let user = new User(data);
    await user.save();
    //Responde al user
    return res.send({
      message: `Register successfully, can be logged with email use ${user.username}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error al registrar un usuario" , err: err});
  }
};

export const loginUser = async (req, res) => {
  try {
    //Capturar los datos (body)
    let { username, password } = req.body;
    //Validar que el usuario exista
    let user = await User.findOne({ username }); //buscar un solo registro
    //Verifico que la contraseña coincida
    if (user && (await checkPassword(password, user.password))) {
      let loggedUser = {
        uid: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      };
      //Geberar el token
      let token = await generateJwt(loggedUser);
      //Respondo al usuario
      return res.send({
        message: `Welcome ${user.name}`,
        loggedUser,
        token,
      });
    }
    return res.status(404).send({ message: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error to login" });
  }
};

//La funcion de actualizar
export const updateUser = async(req,res)=>{
  try{
    let {id} = req.params
    let data = req.body
    let update = checkUpdate(data, id) 
    if(!update) return res.status(401).send({message: 'Have submitted some data that cannot be updated or missing data'})
    let updatedUser = await User.findOneAndUpdated({
      id: id},
      data,
      {new: true}
    )  
    if(!updatedUser) return res.status(400).send({message: 'User not found and not updated'})
    return res.send({
      message: 'Update user', updatedUser
    })
  }catch(err){
    console.error(err)
    if(err.KeyValue.username){    
      return res.status(400).send({message: `Username ${err.KeyValue.username}is already taken  `});   
    }
    return res.status(500).send({message: 'Error updatin account'});
  }
}

// Función para eliminar usuarios con restricciones basadas en el rol
export const deleteU = async (req, res) => {
  try {
    let { id } = req.params; // Obtener el ID del usuario a eliminar
    let deletedUser = await User.findOneAndDelete({_id: id}); // Asumiendo que el rol del usuario está disponible en req.user.role
    if (!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'});
    return res.send({ message: `Account whith username ${deletedUser.username} deleted succesfully` });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error deleting account" });
  }
};

export const historialCompra = async(req, res)=>{
  try{
    let user = req.user.id;
    let factura = await Factura.find({user: user}).populate('carrito');
    if (!factura || Factura.length === 0) {
      return res.status(404).send({ message: 'No shopping history found for the user' });
    }
    return res.status(200).send({ message: 'Shopping history found', factura });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error fetching shopping history', err });
  }
}





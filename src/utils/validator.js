'use strict'

import { hash, compare } from 'bcrypt'

//Se increpta contraseña
export const encrypt = (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}
//Se comprueba el password para ver si es correcta
export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err);
        return err
    }
}

// //Se comprueba el password para ver si es correcta
// export const checkCategory = async (password, hash) => {
//   try {
//       return await compare(password, hash)
//   } catch (err) {
//       console.error(err);
//       return err
//   }
// }


//Se comprueba la actualización
export const checkUpdate = (data, userId) => {
    if (userId) {
        if (
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) {
            return false
        }
        return true
    }
    return true
}



export const update = async (req, res) => {
    try {
      let { id } = req.params;
      let data = req.body;
      let userRole = req.user.role;
  
      // Restricción: Solo permitir actualización si hay datos proporcionados
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send({
          message: "No se proporcionaron datos para actualizar",
        });
      }
  
      // Restricción: Filtrar los datos permitidos para actualizar basado en el rol del usuario
      let filteredData = filterUpdateDataForRole(userRole, data);
      if (Object.keys(filteredData).length === 0) {
        return res.status(400).send({
          message: "No hay campos válidos para actualizar o faltan datos",
        });
      }
  
      // Resto del código ...
  
    } catch (err) {
      // Manejo de errores...
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      let { id } = req.params;
      let userRole = req.user.role;
  
      // Restricción: Solo permitir la eliminación de usuarios por un administrador
      if (userRole !== 'ADMIN') {
        return res.status(403).send({ message: "Operación no autorizada" });
      }
  
      // Resto del código ...
  
    } catch (err) {
      // Manejo de errores...
    }
  };
  
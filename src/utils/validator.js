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

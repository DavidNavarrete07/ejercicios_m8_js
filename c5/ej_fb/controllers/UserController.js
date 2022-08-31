const User = require('../models/User.js');
const Message = require('../models/Message.js');
const bcrypt = require('bcrypt');

async function saveUser(user) {
    if (!user) {
        console.log('No hay datos del usuario');
        return;
    } else if (user.firstName.length == 0 || user.lastName.length == 0 || user.email.length == 0 || user.password.length == 0) {
        console.log('Está ingresando una cadena de texto vacía');
        return;
    } else if (user.password != user.confirmPassword) {
        console.log('Las contraseñas no coinciden');
        return;
    } else {
        try {
            if(findUser(user.email) == null){
                const passwordEncrypted = await bcrypt.hash(user.password, 10);
                await User.create({
                    firstName: user.firstName, lastName: user.lastName, email: user.email, password: passwordEncrypted
                });
            }else{
                console.log('El email ya está ocupado');
                return;
            }
        } catch (error) {
            console.log('Error al crear el usuario \nmensaje: ' + error);
        }
    }
}

async function findUser(emailUser) {
    const user = await User.findOne({ where: { email: emailUser } });
    return user;
}

async function getMessagesOfUser(userId){
    const user = await User.findAll({include: Message, where: {id: userId}});
    return user;
}

async function comparePassword(password, userPassword){
    return await bcrypt.compare(password, userPassword);
}

module.exports = { saveUser, findUser, getMessagesOfUser, comparePassword };
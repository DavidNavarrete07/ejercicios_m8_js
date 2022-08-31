const Message = require('../models/Message.js');
const User = require('../models/User.js');

async function saveMessage(message, userId){
    if(!message || !userId){
        console.log('Ingrese los datos');
    }else if(message.length == 0){
        console.log('Está ingresando una cadena vacía');
    }else{
        try{
            Message.create({message: message, 'userId': userId});
        }catch(error){
            console.log('Surgió un error al guardar el mensaje \nMensaje: ' + error);
        }
    }
}

async function getMessages(){
    const messages = await Message.findAll({include: User});
    return messages;
}

module.exports = {saveMessage, getMessages};
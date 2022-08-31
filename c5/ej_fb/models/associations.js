const User = require('../models/User.js');
const Message = require('../models/Message.js');
const db = require('../sequelize/config.js');

User.hasMany(Message);
Message.belongsTo(User);

try{
    db.sync();
}catch(error){
    console.log('Error en la sincronización: ' + error);
}
const db = require('../sequelize/config.js');

try{
    db.sync();
}catch(error){
    console.log('Error en la sincronización: ' + error);
}
const {DataTypes} = require('sequelize');
const db = require('../sequelize/config.js');

const Autor = db.define('autor', {
    primerNombre: {
        type: DataTypes.STRING(255), 
        allowNull: false
    }, 
    apellido: {
        type: DataTypes.STRING(255), 
        allowNull: false
    }, 
    notas: {
        type: DataTypes.STRING(255), 
        allowNull: false
    }
}, {timestamps: true, freezeTableName: true, tableName: 'autores'});

module.exports = Autor;
const {DataTypes} = require('sequelize');
const db = require('../sequelize/config.js');

const Libro = db.define('libro', {
    titulo: {
        type: DataTypes.STRING(255), 
        allowNull: false
    }, 
    descripcion: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
}, {timestamps: true});

module.exports = Libro;
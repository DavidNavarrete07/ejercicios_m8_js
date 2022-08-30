const { DataTypes } = require('sequelize');
const db = require('../sequelize/config.js');

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Debe ingresar un email válido'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

module.exports = User;
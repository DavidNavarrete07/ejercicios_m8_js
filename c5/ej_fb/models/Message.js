const { DataTypes } = require('sequelize');
const db = require('../sequelize/config.js');

const Message = db.define('message', {
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {timestamps: true});

module.exports = Message;
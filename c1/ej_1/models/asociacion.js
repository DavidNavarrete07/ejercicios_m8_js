const Autor = require('../models/Autor.js');
const Libro = require('../models/Libro.js');
const db = require('../sequelize/config.js');

Autor.belongsToMany(Libro, { through: 'autores_libros' });
Libro.belongsToMany(Autor, { through: 'autores_libros' });

try {
    db.sync();
} catch (error) {
    console.log('Error en la sincronización: ' + error);
}
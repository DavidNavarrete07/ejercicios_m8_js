const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const fnUtils = require('../functionUtils.js');
const Autor = require('../models/Autor.js');
const Libro = require('../models/Libro.js');
require('../models/asociacion.js');

router.get('/libros', async (req, res) => {
    const libros = await Libro.findAll({
        include: Autor
    });
    res.render('home.html', { libros });
});

router.post('/libros', async (req, res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    try {
        await Libro.create({ titulo, descripcion });
    } catch (error) {
        console.log('Error al crear el Libro: ' + error);
    }
    res.redirect('http://localhost:3000/api/libros');
});

router.get('/books/:libro_id', async (req, res) => {
    const libroId = parseInt(req.params.libro_id);
    const libro = await Libro.findOne({where: { id: libroId }, include: Autor});
    let autores = await Autor.findAll({ include: Libro });
    let arregloAutores = [];
    for (const autor of autores) {
        for (const libro of autor.libros) {
            for (const autorLibro of autores) {
                if (autor.id != autorLibro.id) {
                    arregloAutores.push(autorLibro);
                }
            }
        }
    }
    res.render('libro.html', { libro, arregloAutores });
});

router.delete('/books/:libro_id', async (req, res) => {
    console.log(req.params);
});

router.get('/authors', async (req, res) => {
    const autores = await Autor.findAll();
    res.render('autores.html', { autores });
});

router.post('/authors', async (req, res) => {
    const primerNombre = req.body.primerNombre;
    const apellido = req.body.apellido;
    const notas = req.body.notas;
    try {
        await Autor.create({ primerNombre, apellido, notas });
    } catch (error) {
        console.log('Error al crear un Autor: ' + error);
    }
    res.redirect('http://localhost:3000/api/authors');
});

router.get('/authors/:autor_id', async (req, res) => {
    const autorId = req.params.autor_id;
    const autor = await Autor.findOne({ include: Libro }, { where: { id: autorId } });
    const libros = await Libro.findAll({ include: Autor });
    let arregloLibros = [];
    for (const libro of libros) {
        for (const autor of libro.autors) {
            for (const libroAutor of libros) {
                if (libro.id != libroAutor.id) {
                    arregloLibros.push(libroAutor);
                }
            }
        }
    }
    res.render('autor.html', { autor, arregloLibros });
});

router.delete('/authors/:autor_id', async (req, res) => {

});

router.post('/escribir', async (req, res) => {
    const autorId = parseInt(req.body.autorId);
    const libroId = parseInt(req.body.libroId);
    const libro = await Libro.findOne({ where: { id: libroId } });
    const autor = await Autor.findOne({ where: { id: autorId } });

    await libro.addAutor(autor, { through: { selfGranted: false } });
    // await autor.addLibro([{ titulo: libro.titulo, descripcion: libro.descripcion }]);
});


module.exports = router;
const express = require('express');
const router = express.Router();
const fnUtils = require('../functionUtils.js');
const Autor = require('../models/Autor.js');
const Libro = require('../models/Libro.js');
require('../models/asociacion.js');

router.get('/libros', async (req, res) => {
    const libros = await Libro.findAll();
    res.json(libros);
});

router.post('/libros', async (req, res) => {
    const form = await fnUtils.getForm(req);
    const titulo = form.titulo;
    const descripcion = form.descripcion;
    try {
        await Libro.create({ titulo, descripcion });
    } catch (error) {
        console.log('Error al crear el Libro: ' + error);
    }
});

router.get('/autores', async (req, res) => {
    const autores = await Autor.findAll();
    res.json(autores);
});

router.post('/autores', async (req, res) => {
    const form = await fnUtils.getForm(req);
    const primerNombre = form.primerNombre;
    const apellido = form.apellido;
    const notas = form.notas;
    try {
        await Autor.create({ primerNombre, apellido, notas });
    } catch (error) {
        console.log('Error al crear un Autor: ' + error);
    }
});

router.get('/escribir/:libro_id/:autor_id', async(req, res) => {
    console.log('*****************************************');
    console.log(req.params);
});


module.exports = router;
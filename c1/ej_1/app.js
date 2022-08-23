const express = require('express');
const router = require('./routes/routes.js');
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();

// Configuramos formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static('public'));

// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoscape: true,
    noCache: true,
    watch: true,
  });
  
app.use(express.static('node_modules/bootstrap/dist'));

// Impórtamos las rutas
app.use('/api', router);

// Ruta por defecto
app.get('*', (req, res) => {
    res.send('Ruta no implementada');
})

app.listen(3000, () => console.log('Servidor ejecutando en puerto 3000'));
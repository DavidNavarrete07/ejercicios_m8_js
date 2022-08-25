const express = require('express');
const session = require('express-session');
const path = require('path');
const nunjucks = require("nunjucks");

const app = express();

// Configuramos sesion
app.use(session({ secret: 'hmit' }));

// Configuramos formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos archivos estáticos
app.use("/public", express.static('public'));

// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoscape: true,
    noCache: true,
    watch: true,
});

app.use(express.static('node_modules/bootstrap/dist'));

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let word= ' ';
    for ( let i = 0; i < num; i++ ) {
        word += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return word;
}

app.get('/random_word', (req, res) => {
    if(req.session.intentos == undefined){
        req.session.intentos = 0;
    }
    req.session.intentos++;
    const intentos = req.session.intentos;
    const randomWord = generateRandomString(15);
    res.render('base.html', {randomWord, intentos});
});

app.get('/random/reset', (req, res) => {
    req.session.intentos = 0;
    res.redirect('/random_word');
});

// Ruta por defecto
app.get('*', (req, res) => {
    res.send('Ruta no implementada');
})

app.listen(3000, () => console.log('Servidor ejecutando en puerto 3000'));
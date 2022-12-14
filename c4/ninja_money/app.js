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


function randomNumber(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


app.get('/', (req, res) => {
    if (req.session.oro == undefined) {
        req.session.oro = 0;
    }
    if(req.session.messages == undefined){
        req.session.messages = [];
    }
    const oro = req.session.oro;
    const messages = req.session.messages;
    console.log(messages);
    res.render('base.html', { oro, messages });
});

app.post('/process_money/:lugar', (req, res) => {
    let random = 0;
    let message;
    let accion;
    let lugar = req.params.lugar;
    if (lugar == 'granja') {
        random = randomNumber(10, 20);
        req.session.oro += random;
        accion = 'encontró: '
        message = 'El ninja ' + accion + ' ' + random + ' oro(s) en la granja';
        req.session.messages.push({message, accion});
    } else if (lugar == 'cueva') {
        random = randomNumber(5, 10);
        req.session.oro += random;
        accion = 'encontró: '
        message = 'El ninja ' + accion + ' ' + random + ' oro(s) en la cueva';
        req.session.messages.push({message, accion});
    } else if (lugar == 'casa') {
        random = randomNumber(2, 5);
        req.session.oro += random;
        accion = 'encontró: '
        message = 'El ninja ' + accion + ' ' + random + ' oro(s) en la casa';
        req.session.messages.push({message, accion});
    } else if (lugar == 'casino') {
        random = randomNumber(-50, 50);
        req.session.oro += random;
        if (random < 0) {
            accion = 'perdió: ';
            message = 'El ninja ' + accion + ' ' + random + ' oro(s) en el casino';
            req.session.messages.push({message, accion});
        } else {
            accion = 'encontró: '
            message = 'El ninja ' + accion + ' ' + random + ' oro(s) en el casino';
            req.session.messages.push({message, accion});
        }
    } else {
        console.log('No se especifico el formulario');
    }
    res.redirect('/');
});

// Ruta por defecto
app.get('*', (req, res) => {
    res.send('Ruta no implementada');
})

app.listen(3000, () => console.log('Servidor ejecutando en puerto 3000'));
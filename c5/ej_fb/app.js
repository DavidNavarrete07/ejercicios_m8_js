const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks');
const path = require('path');
require('./models/associations.js');

const app = express();

app.use(session({ secret: 'mwa' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(express.static('./node_modules/bootstrap/dist'));

nunjucks.configure(path.resolve(__dirname, 'templates'), {
    express: app,
    autoescape: true,
    noCache: true,
    watch: true,
});

app.use(require('./routes/auth.js'));
app.use(require('./routes/routes.js'));


app.listen(3000, () => {
    console.log('servidor ejecutando en el puerto 3000');
});

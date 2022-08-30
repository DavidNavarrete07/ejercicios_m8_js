const { Router } = require('express');

const router = Router();

function protected_route(req, res, next) {
    if (!req.session.user) {
        //   req.flash('errors', 'Debe loguearse primero')
        console.log('Debe loguearse primero');
        return res.redirect('/login')
    }
    // si llegamos hasta acá, guardamos el usuario de la sesión en una variable de los templates
    res.locals.user = req.session.user;
    // finalmente, seguimos el camino original
    next();
}

router.get('/', protected_route, (req, res) => {
    res.render('home.html');
});

router.get('*', (req, res) => {
    res.render('errors/404.html');
});

module.exports = router;
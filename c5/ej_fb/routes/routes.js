const { Router } = require('express');
const UserController = require('../controllers/UserController.js');
const MessageController = require('../controllers/MessageController.js');

const router = Router();

async function protected_route(req, res, next) {
    if (!req.session.user) {
        //   req.flash('errors', 'Debe loguearse primero')
        console.log('Debe loguearse primero');
        return res.redirect('/login')
    }
    // si llegamos hasta acá, guardamos el usuario de la sesión en una variable de los templates
    res.locals.user = req.session.user;
    const messages = await MessageController.getMessages();
    res.locals.messages = messages;
    for(let message of res.locals.messages){
        console.log(message.user);
    }
    // finalmente, seguimos el camino original
    next();
}

router.get('/', protected_route, async(req, res) => {
    res.render('home.html');
});

router.post('/message', protected_route, async (req, res) => {
    const email = req.body.userEmail.trim();
    const message = req.body.message.trim();
    let user = await UserController.findUser(email);
    await MessageController.saveMessage(message, user.id);
    res.redirect('/');
});

router.get('*', (req, res) => {
    res.render('errors/404.html');
});

module.exports = router;
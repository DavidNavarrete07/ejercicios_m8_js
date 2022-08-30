const { Router } = require('express');
const UserController = require('../controllers/UserController.js');

const router = Router();

router.get('/login', (req, res) => {
    res.render('auth/login.html');
});

router.post('/login', async (req, res) => {
    const user = {
        email: req.body.email.trim(),
        password: req.body.password.trim()
    }
    let userFinded = await UserController.findUser(user.email);
    if (!userFinded) {
        console.log('Usuario inexistente');
        return res.redirect('/login');
    }
    if (!await UserController.comparePassword(user.password, userFinded.password)) {
        console.log('La contraseña no coincide');
        return res.redirect('/login');
    }
    req.session.user = {
        name: `${userFinded.firstName} ${userFinded.lastName}`, 
        email: userFinded.email
    }
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register.html');
});

router.post('/register', async (req, res) => {
    const user = {
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        password: req.body.password.trim(),
        confirmPassword: req.body.confirmPassword.trim()
    }
    await UserController.saveUser(user);
    req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email };
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
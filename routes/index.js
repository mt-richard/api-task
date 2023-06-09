const path = require('path');
const express = require('express')
const route = express.Router()
const auth = require('../middleware/authenticate')

route.get('/', function(req, res) {
    const filePath = path.join(__dirname, '..', 'views', 'index.html');
    res.sendFile(filePath);
});

route.get('/create', function(req, res) {
    const filePath = path.join(__dirname, '..', 'views', 'signup.html');
    res.sendFile(filePath);
});

route.get('/apply', function(req, res) {
    const filePath = path.join(__dirname, '..', 'views', 'application.html');
    res.sendFile(filePath);
});

route.get('/applicants', function(req, res) {
    const filePath = path.join(__dirname, '..', 'views', 'applicants.html');
    res.sendFile(filePath);
});

route.get('/dashboard', function(req, res) {
    const filePath = path.join(__dirname, '..', 'views', 'dashboard.html');
    res.sendFile(filePath);
});

route.get('/profile', function(req, res) {
    if (!(auth.authenticate.status === 401)) {
        const filePath = path.join(__dirname, '..', 'views', 'profile.html');
        res.sendFile(filePath);
    } else {
        res.redirect('/');
    }
});


route.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/');
});

module.exports = route;
const express = require('express');
const app = express();
const email = require('../models/email.js');

app.post("/welcome", function (req, res) {
    let emailTo = req.body.emailTo
    let username = req.body.username
    let password = req.body.password
    
    email.sendWelcomeEmail(req, res, emailTo, username, password);
});

app.post("/loginAccount", function (req, res) {
    let emailTo = req.body.emailTo
    let date = new Date()
    
    //TODO: Enviar IP ??    
    // let ip = req.body.ip

    email.sendLoginEmail(req, res, emailTo, date);
});

module.exports = app;
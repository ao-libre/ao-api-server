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
    let ip = req.body.ip
    let date = req.body.date
    
    email.sendLoginEmail(req, res, emailTo, ip, date);
});

module.exports = app;
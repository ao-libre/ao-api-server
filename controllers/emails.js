const express = require('express');
const app = express();
const email = require('../models/email.js');

app.post("/welcome", function (req, res) {
    let emailTo = req.body.emailTo
    let username = req.body.username
    let password = req.body.password
    
    email.sendWelcomeEmail(req, res, emailTo, username, password);
});

module.exports = app;
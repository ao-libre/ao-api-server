const express = require('express');
const app = express();
const email = require('../models/email.js');

app.post("/welcome", function (req, res) {
    let emailTo = req.body.emailTo
    let username = req.body.username
    let password = req.body.password
    
	console.info("welcome: " + req.body.emailTo)
	
    email.sendWelcomeEmail(req, res, emailTo, username, password);
});

app.post("/loginAccount", function (req, res) {
    let emailTo = req.body.emailTo
    let date = new Date()
    
    //TODO: Enviar IP ??    
    // let ip = req.body.ip
	
	console.info("loginAccount: " + req.body.emailTo)
    
	email.sendLoginEmail(req, res, emailTo, date);
});

app.post("/resetAccountPassword", function (req, res) {
    let emailTo = req.body.emailTo
    let newPassword = req.body.newPassword
	
	console.info("resetAccountPassword: " + emailTo)
    
	email.sendResetAccountPassword(req, res, emailTo, newPassword);
});


module.exports = app;
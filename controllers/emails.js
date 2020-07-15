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
    const emailTo = req.body.emailTo
    const lastIpsUsed = req.body.lastIpsUsed
    const currentIp = req.body.currentIp

    if (lastIpsUsed.includes(currentIp)) {
        return res.status(200).send('No se envio email de login a ' + req.body.emailTo + ' por que se conecto desde una ip antes usada: ' + currentIp); 
    } 

    const date = new Date()
	
	console.info("loginAccount: " + req.body.emailTo + " Conectado con ip: " + req.body.currentIp)
	email.sendLoginEmail(req, res, emailTo, date, currentIp);
});

app.post("/resetAccountPassword", function (req, res) {
    let emailTo = req.body.emailTo
    let newPassword = req.body.newPassword
	
	console.info("resetAccountPassword: " + emailTo)
    
	email.sendResetAccountPassword(req, res, emailTo, newPassword);
});


module.exports = app;
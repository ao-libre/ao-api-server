const express = require('express');
const app = express();
const email = require('../models/email.js');

app.get("/welcome/:emailto", function (req, res) {
    email.sendWelcomeEmail(req, res, req.params.emailto);
});

module.exports = app;
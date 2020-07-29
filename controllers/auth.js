const express = require('express');
const app = express();
const account  = require('../models/account');

app.post('/login/', function (req, res) {
    account.login(req, res, req.body.email, req.body.password);
});

module.exports = app;
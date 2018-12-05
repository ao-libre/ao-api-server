const express = require('express');
const app = express();
const user = require('../models/user.js');

app.get("/usersonline", function (req, res) {
    user.getAllUsersConnectedCount(req, res);
});

module.exports = app;

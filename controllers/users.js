const express = require('express');
const app = express();
const user = require('../models/user.js');

app.get("/usersonline", function (req, res) {
    user.getAllUsersConnectedCount(req, res);
});

app.get("/users", function (req, res) {
    user.getAllUsers(req, res);
});

app.get("/userstoptenlevel", function (req, res) {
    user.getTopTenMaxLeverUsers(req, res);
});

module.exports = app;

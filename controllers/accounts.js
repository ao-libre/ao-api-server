const express = require('express');
const app = express();
const account = require('../models/account.js');

app.get("/all", function (req, res) {
    account.getAllAccounts(req, res);
});

app.get("/backupaccountfiles", function (req, res) {
    account.backupAccountFiles(req, res);
});

module.exports = app;

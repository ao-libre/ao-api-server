const express = require('express');
const app = express();
const account = require('../models/account.js');

app.get("/backupaccountfiles", function (req, res) {
    account.backupAccountFiles(req, res);
});

app.get("/test/:jojo", function (req, res, jojo) {
    console.log('123', jojo)
    res.status(200)
});

app.get("/resetPassword/:email/:newPassword", function (req, res) {
    //Email es lo mismo cuenta...
    account.resetPassword(req, res, req.params.email, req.params.newPassword);
});

module.exports = app;

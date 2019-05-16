const express = require('express');
const app = express();
const logs = require('../models/log.js');

app.get("/backuplogs", function (req, res) {
    logs.backupLogs(req, res);
});

app.get("/getAllGmsLogs", function (req, res) {
    logs.getAllGmsLogs(req, res);
});


module.exports = app;

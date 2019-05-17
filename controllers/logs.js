const express = require('express');
const app = express();
const logs = require('../models/log.js');

app.get("/backuplogs", function (req, res) {
    logs.backupLogs(req, res);
});

app.get("/getAllGmsLogs", function (req, res) {
    logs.getAllGmsLogs(req, res);
});

app.get("/getErrorsLogs", function (req, res) {
    logs.getErrorsLogs(req, res);
});

app.get("/getBackupsLogs", function (req, res) {
    logs.getBackupsLogs(req, res);
});

app.get("/getNumUsersLogs", function (req, res) {
    logs.getNumUsersLogs(req, res);
});

app.get("/getMainLogs", function (req, res) {
    logs.getMainLogs(req, res);
});

app.get("/getDesarrolloLogs", function (req, res) {
    logs.getDesarrolloLogs(req, res);
});

app.get("/getStatisticsLogs", function (req, res) {
    logs.getStatisticsLogs(req, res);
});

app.get("/getTimeLastUpdated", function (req, res) {
    logs.getTimeLastUpdated(req, res);
});

module.exports = app;

const express = require('express');
const app = express();
const logs = require('../models/log.js');

app.get("/backuplogs", async function (req, res) {
    await logs.backupLogs(req, res);
});

module.exports = app;

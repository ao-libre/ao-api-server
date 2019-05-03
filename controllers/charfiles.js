const express = require('express');
const app = express();
const charfile = require('../models/charfile.js');

app.get("name/:name", function (req, res) {
    charfile.getCharfileByName(req, res, req.params.name);
});

app.get("/backupcharfiles", function (req, res) {
    charfile.backupCharfiles(req, res);
});

module.exports = app;
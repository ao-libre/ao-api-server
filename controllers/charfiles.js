const express = require('express');
const app = express();
const charfile = require('../models/charfile.js');

app.get("/:name", function (req, res) {
    charfile.getCharfileByName(req, res, req.params.name);
});

module.exports = app;
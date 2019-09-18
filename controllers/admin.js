const express = require('express');
const app = express();

app.get("/dashboard", function (req, res) {
    res.sendFile('admin/index.html', {root: '.'});
});

module.exports = app;
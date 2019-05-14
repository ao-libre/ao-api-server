const express = require('express');
const app = express();
const charfile = require('../models/charfile.js');

//This endpoint is to get the file of the charfile
app.get("/file/:name", function (req, res) {
    charfile.getCharfileByName(req, res, req.params.name);
});

//This endpoint is to get the information of the char from the database
app.get("/name/:name", function (req, res) {
    charfile.getCharByName(req, res, req.params.name);
});

app.get("/all", function (req, res) {
    charfile.getAllChars(req, res);
});

app.get("/toptenlevel", function (req, res) {
    charfile.getTopTenMaxLeverChars(req, res);
});

app.get("/toptengold", function (req, res) {
    charfile.getTopTenMoreGoldChars(req, res);
});

app.get("/toptenmoretimeonline", function (req, res) {
    charfile.getTopTenMoreTimeOnline(req, res);
});

app.get("/toptenmorehp", function (req, res) {
    charfile.getTopTenMoreHp(req, res);
});

app.get("/toptencharkiller", function (req, res) {
    charfile.getTopTenCharKiller(req, res);
});

app.get("/toptennpckiller", function (req, res) {
    charfile.getTopTenNpcKiller(req, res);
});

app.get("/backupcharfiles", function (req, res) {
    charfile.backupCharfiles(req, res);
});

app.get("/lastTimeUpdated", function (req, res) {
    charfile.getTimeLastUpdated(req, res);
});

app.get("/getCountChars", function (req, res) {
    charfile.getCountChars(req, res);
});

app.get("/getGameMasters", function (req, res) {
    charfile.getAllGms(req, res);
});

module.exports = app;
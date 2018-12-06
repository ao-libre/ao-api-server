const express = require('express');
const app = express();
const user = require('../models/user.js');

app.get("/online", function (req, res) {
    user.getAllUsersConnectedCount(req, res);
});

app.get("/all", function (req, res) {
    user.getAllUsers(req, res);
});

app.get("/toptenlevel", function (req, res) {
    user.getTopTenMaxLeverUsers(req, res);
});

app.get("/toptengold", function (req, res) {
    user.getTopTenMoreGoldUsers(req, res);
});

app.get("/toptenmoretimeonline", function (req, res) {
    user.getTopTenMoreTimeOnline(req, res);
});

app.get("/toptenmorelife", function (req, res) {
    user.getTopTenMoreLife(req, res);
});

app.get("/toptenuserkiller", function (req, res) {
    user.getTopTenUserKiller(req, res);
});

app.get("/toptennpckiller", function (req, res) {
    user.getTopTenNpcKiller(req, res);
});

app.get("/armada", function (req, res) {
    user.getAllArmadaUsers(req, res);
});

app.get("/caos", function (req, res) {
    user.getAllCaosUsers(req, res);
});

app.get("/consejoarmada", function (req, res) {
    user.getAllArmadaConsejoUsers(req, res);
});

app.get("/consejocaos", function (req, res) {
    user.getAllCaosConsejoUsers(req, res);
});

module.exports = app;

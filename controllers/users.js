const express = require('express');
const app = express();
const db = require('../db');

app.get("/usersonline", function (req, res) {
    console.log(123, db.get())

});
const express = require('express');
const app = express();
const email = require('../models/guilds.js');

app.get("/deleteandresetguilds", function (req, res) {
	console.info("ATENCION!! - Borrando todos los clanes y sacar clan de usuarios")
	
    guilds.deleteAllGuildAndResetUsers(req, res);
});

module.exports = app;
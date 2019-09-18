require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
const db = require('./db');
const Discord = require('discord.js');
const filemanagerMiddleware = require('@opuscapita/filemanager-server').middleware;

const { getOnlineUsersQuantityInServer } = require('./utils/server-configuration');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())


const config = {
    fsRoot: path.resolve(__dirname, './server'),
    rootName: 'Server Argentum Online'
};
app.use('/fileManager/', filemanagerMiddleware(config));

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/charfiles', require('./controllers/charfiles'));
app.use('/api/v1/accounts', require('./controllers/accounts'));
app.use('/api/v1/emails', require('./controllers/emails'));
app.use('/api/v1/logs', require('./controllers/logs'));
app.use('/api/v1/discord', require('./controllers/discord'));


// Iniciamos el cliente de discord.js
const clientDiscord = global.clientDiscord = new Discord.Client();
clientDiscord.on('ready', () => {
    console.log(`Logged in Discord as ${clientDiscord.user.tag}!`);
});

clientDiscord.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }

    if (message.content === '/online') {
        const usersOnline = getOnlineUsersQuantityInServer()
        message.reply(`En este momento hay: ${usersOnline} conectados en el servidor de Rol Alkon 0.13.X`);
    }
});

clientDiscord.login(process.env.DISCORD_TOKEN);

// Connect to MySQL on start
db.connect(function (err) {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(port, function () {
            var datetime = new Date();
            var message = "Argentum Online API on Port:- " + port + " Started at :- " + datetime;
            console.log('\x1b[35m%s\x1b[0m', message);
        });
    }
});
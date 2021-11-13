require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const https = require('https')
const app = express();
const port = process.env.PORT || 1337;
const db = require('./db');
const filemanagerMiddleware = require('@opuscapita/filemanager-server').middleware;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

const configFileManager = {
    fsRoot: path.resolve(__dirname, './server'),
    rootName: 'Server AO Libre'
};

// app.use('/fileManager/', filemanagerMiddleware(configFileManager));

// usado en './controllers/servers';
global.serversOnlineQuantityUsers = [];
global.serverIpAddress = null;

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/charfiles', require('./controllers/charfiles'));
app.use('/api/v1/accounts', require('./controllers/accounts'));
app.use('/api/v1/emails', require('./controllers/emails'));
app.use('/api/v1/logs', require('./controllers/logs'));
app.use('/api/v1/discord', require('./controllers/discord'));
app.use('/api/v1/admin', require('./controllers/admin'));
app.use('/api/v1/guilds', require('./controllers/guilds'));
app.use('/api/v1/servers', require('./controllers/servers'));

// Connect to MySQL on start
db.connect(function (err) {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Unable to connect to MySQL.')
        process.exit(1)
    } else {
        console.log('\x1b[34m%s\x4b[0m', "Conexion a la BD MySQL Exitosa.");
    }
});

app.listen(port, function () {
    var datetime = new Date();
    var message = "Argentum Online API on Port:- " + port + " Started at :- " + datetime;
    console.log('\x1b[35m%s\x1b[0m', message);


    ///Obtenemos IP del server donde se ejecuta la api.
    const options = {
        hostname: 'api.ipify.org',
        method: 'GET'
    }

    var req = https.request(options, function(res) {
        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function(chunk) {
          // You can process streamed parts here...
          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          console.log('Ip del Server: ' + body);
          global.serverIpAddress = body;
        })
    });

    req.on('error', error => {
        console.error(error)
    })

    req.end()
    ///Fin Obtenemos IP del server donde se ejecuta la api.
    
});

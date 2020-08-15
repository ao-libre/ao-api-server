require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
const db = require('./db');
const emailTransporter = require('./email-transporter');
const filemanagerMiddleware = require('@opuscapita/filemanager-server').middleware;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

const configFileManager = {
    fsRoot: path.resolve(__dirname, './server'),
    rootName: 'Server AO Libre'
};
app.use('/fileManager/', filemanagerMiddleware(configFileManager));

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/charfiles', require('./controllers/charfiles'));
app.use('/api/v1/accounts', require('./controllers/accounts'));
app.use('/api/v1/emails', require('./controllers/emails'));
app.use('/api/v1/logs', require('./controllers/logs'));
app.use('/api/v1/discord', require('./controllers/discord'));
app.use('/api/v1/admin', require('./controllers/admin'));
app.use('/api/v1/guilds', require('./controllers/guilds'));

// Create email transporter pool to send emails
emailTransporter.createTransporter(function(err) {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Unable to connect to Create Email Transporter.')
        process.exit(1)
    } else {
        console.log('\x1b[32m%s\x1b[0m', `Transportador de email general creado con exito para el email: ${process.env.EMAIL}`);
        console.log('\x1b[38m%s\x1b[0m', `Transportador de email newsletter creado con exito para el email: ${process.env.EMAIL_NEWSLETTER}`);
    }
});

// Connect to MySQL on start
db.connect(function (err) {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Unable to connect to MySQL.')
        process.exit(1)
    } else {
        console.log('\x1b[34m%s\x4b[0m', "Conexion a la BD MySQL Exitosa!");
    }
});

app.listen(port, function () {
    var datetime = new Date();
    var message = "Argentum Online API on Port:- " + port + " Started at :- " + datetime;
    console.log('\x1b[35m%s\x1b[0m', message);
});

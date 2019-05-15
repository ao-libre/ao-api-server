require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
const db = require('./db');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/charfiles', require('./controllers/charfiles'));
app.use('/api/v1/accounts', require('./controllers/accounts'));
app.use('/api/v1/emails', require('./controllers/emails'));
app.use('/api/v1/logs', require('./controllers/logs'));


// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(port, function () {
            var datetime = new Date();
            var message = "Server running on Port:- " + port + " Started at :- " + datetime;
            console.log(message);
        });
    }
});
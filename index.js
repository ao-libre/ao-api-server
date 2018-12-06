const express = require('express');
const app = express();
const port = process.env.port || 1337;
const charfile = require('./utils/ao-charfile-reader');
const db = require('./db');

app.use('/api/v1/users', require('./controllers/users'));


app.get("/charfile/:chrFileName", function(request, response)  {
    console.log(request.params.chrFileName);
    charfile.getCharFile(request.params.chrFileName).then(console.log).catch(console.error);
});


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
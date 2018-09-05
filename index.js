const express = require('express');
const app = express();
const port = process.env.port || 1337;
const charfile = require('./utils/ao-charfile-reader');


app.get("/charfile/:chrFileName", function(request, response)
{
    console.log(request.params.chrFileName);
    charfile.getCharFile(request.params.chrFileName).then(console.log).catch(console.error);
});

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server running on Port:- " + port + " Started at :- " + datetime;
    console.log(message);
});
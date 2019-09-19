const express = require('express');
const app = express();
const fs = require('fs');

app.post("/authorization", function (req, res) {
    let password = req.body.password;

    if (process.env.ADMIN_PASSWORD === password) {
        return res.status(200).send('Se te otorga acceso al administrador :)');
    }
    return res.status(401).send('No estas autorizado a entrar... :(');

});

app.post("/getFileByName", function (req, res) {
    let fileName = req.body.fileName;
    const finder = require('findit')('./server');

    finder.on('file', function (file, stat) {
        if (file.includes(fileName)) {
            finder.stop()
            const fileContent = fs.readFileSync(file, 'utf-8');
            return res.status(202).send(fileContent);
        }
    });
});

app.post("/editFileByName", function (req, res) {
    let fileName = req.body.fileName;
    let fileContent = req.body.fileContent;
    const finder = require('findit')('./server');

    finder.on('file', function (file, stat) {
        if (file.includes(fileName)) {
            finder.stop()
            fs.writeFileSync(file, fileContent)
            const message = `El archivo ${fileName} fue editado con exito`;
            return res.status(202).send(message);
        }
    });

});

module.exports = app;
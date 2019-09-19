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
    const finder = require('findit2')('./server');

    finder.on('file', function (file, stat) {
        // Hago esto para separar en un array todos los elementos de la path
        // Por que esta funcion devuelve una path, y luego comparo que el archivo sea el que queremos
        const fileArray = file.split("\\");

        // El ultimo elemento del array va a ser el nombre del archivo
        const fileArrayLastElement = fileArray[fileArray.length - 1];

        if (fileName === fileArrayLastElement) {
            finder.stop()
            const fileContent = fs.readFileSync(file, 'utf-8');
            return res.status(202).send(fileContent);
        }
    });

    finder.on('end', function () {
        return res.status(404).send('No existe un archivo con ese nombre');
    })
});

app.post("/editFileByName", function (req, res) {
    let fileName = req.body.fileName;
    let fileContent = req.body.fileContent;
    const finder = require('findit2')('./server');

    finder.on('file', function (file, stat) {
        // Hago esto para separar en un array todos los elementos de la path
        // Por que esta funcion devuelve una path, y luego comparo que el archivo sea el que queremos
        const fileArray = file.split("\\");

        // El ultimo elemento del array va a ser el nombre del archivo
        const fileArrayLastElement = fileArray[fileArray.length - 1];

        if (fileName === fileArrayLastElement) {
            finder.stop()
            fs.writeFileSync(file, fileContent)
            const message = `El archivo ${fileName} fue editado con exito`;
            return res.status(202).send(message);
        }
    });

    finder.on('end', function () {
        return res.status(404).send('Lo que estas tratando de editar no existe');
    })

});

module.exports = app;
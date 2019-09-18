const express = require('express');
const app = express();
const fs = require('fs');

app.post("/getFileByName", function (req, res) {
    let fileName = req.body.fileName;
    const finder = require('findit')('./server');

    finder.on('file', function (file, stat) {
        if (file.includes(fileName)) {
            const fileContent = fs.readFileSync(file, 'utf-8');
            return res.status(202).send(fileContent);
        }
    });
});

app.post("/editFileByName", function (req, res) {
    let fileName = req.body.fileName;
    let fileContent = req.body.fileContent;
    const finder = require('findit')('./server');
    console.log(123456, fileName,fileContent )

    finder.on('file', function (file, stat) {
        if (file.includes(fileName)) {
            fs.writeFileSync(file, fileContent)
            const message = `El archivo ${fileName} fue editado con exito`;
            return res.status(202).send(message);
        }
    });

});

app.get("/dashboard", function (req, res) {
    res.sendFile('admin/index.html', {root: '.'});
});

module.exports = app;
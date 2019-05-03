const fs = require('fs');
const ini = require('ini');
const path = require('path');

function readIniFile(chrName){
    let chrFilePath =  path.join(`./charfiles/${chrName}.chr`);
    return ini.decode(fs.readFileSync(chrFilePath, 'utf-8'));
}

function writeCharfileInDatabase(charfile) {
    let chrJson = readIniFile(charfile);

};

exports.getCharfileByName = function(req, res, chrName) {
    try {
        let chrJson = readIniFile(chrName);
        res.status(202).json(chrJson)
      } catch (err) {

        if (err.code === 'ENOENT') {
            res.status(404).send('El charfile no existe: ' + charfilePath);
            console.error('File not found!');
        } else {
            res.status(500)
        }
      }
};

exports.backupCharfiles = function(req, res) {
    const directory = "";

    files = fs.readdirSync(directory);
    files = files.filter(file => file.endsWith('.chr'));
    files.forEach(writeCharfileInDatabase);

};

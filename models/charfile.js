const fs = require('fs');
const ini = require('ini');

function readIniFile(charfile){
    return ini.decode(fs.readFileSync('SHAK.chr', 'utf-8'));
}

function writeCharfileInDatabase(charfile) {
    let chrJson = readIniFile(charfile);



};

exports.getCharfileByName = function(req, res, chrName) {
    let fileContents;
    let charfilePath = `${chrName}.chr`

    console.log(fs.readFileSync('lala.chr'));
    try {
        fileContents = readIniFile(charfilePath);
        res.status(202).json(fileContents)
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
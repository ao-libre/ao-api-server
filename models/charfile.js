const fs = require('fs');
const ini = require('ini');
const path = require('path');
const db = require('../db.js');

function readIniFile(chrName){
    let chrFilePath =  path.join(`./charfiles/${chrName}`);
    return ini.decode(fs.readFileSync(chrFilePath, 'utf-8'));
}

function writeCharfileInDatabase(charfile) {
    let chrJson = readIniFile(charfile);
console.log(chrJson);
    let query = `INSERT INTO charfiles_worldsave(
        ATRIBUTOS.AT1
        ATRIBUTOS.AT2
        ATRIBUTOS.AT3
        ATRIBUTOS.AT4
        ATRIBUTOS.AT5
        CONSEJO.PERTENECE
        CONSEJO.PERTENECECAOS
        CONTACTO.EMAIL
        COUNTERS.PENA
        COUNTERS.SKILLSASIGNADOS
        FACCIONES.CIUDMATADOS
        FACCIONES.CRIMMATADOS
        FACCIONES.EJERCITOCAOS
        FACCIONES.EJERCITOREAL
        FACCIONES.FECHAINGRESO
        FACCIONES.MATADOSINGRESO
        FACCIONES.NEXTRECOMPENSA
        FACCIONES.NIVELINGRESO
        FACCIONES.RARCAOS
        FACCIONES.RARREAL
        FACCIONES.RECCAOS
        FACCIONES.RECREAL
        FACCIONES.REENLISTADAS
        FACCIONES.REXCAOS
        FACCIONES.REXREAL
        FLAGS.BAN
        FLAGS.DESNUDO
        FLAGS.ENVENENADO
        FLAGS.ESCONDIDO
        FLAGS.HAMBRE
        FLAGS.LASTMAP
        FLAGS.MUERTO
        FLAGS.NAVEGANDO
        FLAGS.PARALIZADO
        FLAGS.SED
        INIT.ARMA
        INIT.BODY
        INIT.CASCO
        INIT.CLASE
        INIT.DESC
        INIT.ESCUDO
        INIT.GENERO
        INIT.HEAD
        INIT.HEADING
        INIT.HOGAR
        INIT.LASTIP1
        INIT.LOGGED
        INIT.PASSWORD
        INIT.POSITION
        INIT.RAZA
        INIT.UPTIME
        MASCOTAS.MAS1
        MASCOTAS.MAS2
        MASCOTAS.MAS3
        MASCOTAS.NROMASCOTAS
        MUERTES.NPCSMUERTES
        MUERTES.USERMUERTES
        REP.ASESINO
        REP.BANDIDO
        REP.BURGUESIA
        REP.LADRONES
        REP.NOBLES
        REP.PLEBE
        REP.PROMEDIO
        RESEARCH.TRAINNINGTIME
        STATS.BANCO
        STATS.ELU
        STATS.ELV
        STATS.EXP
        STATS.GLD
        STATS.MAXAGU
        STATS.MAXHAM
        STATS.MAXHIT
        STATS.MAXHP
        STATS.MAXMAN
        STATS.MAXSTA
        STATS.MINAGU
        STATS.MINHAM
        STATS.MINHIT
        STATS.MINHP
        STATS.MINMAN
        STATS.MINSTA)

           VALUES(
            ${chrJson.ATRIBUTOS.AT1},
            ${chrJson.ATRIBUTOS.AT2},
            ${chrJson.ATRIBUTOS.AT3},
            ${chrJson.ATRIBUTOS.AT4},
            ${chrJson.ATRIBUTOS.AT5},
            ${chrJson.CONSEJO.PERTENECE},
            ${chrJson.CONSEJO.PERTENECECAOS},
            ${chrJson.CONTACTO.EMAIL},
            ${chrJson.COUNTERS.PENA},
            ${chrJson.COUNTERS.SKILLSASIGNADOS},
            ${chrJson.FACCIONES.CIUDMATADOS},
            ${chrJson.FACCIONES.CRIMMATADOS},
            ${chrJson.FACCIONES.EJERCITOCAOS},
            ${chrJson.FACCIONES.EJERCITOREAL},
            ${chrJson.FACCIONES.FECHAINGRESO},
            ${chrJson.FACCIONES.MATADOSINGRESO},
            ${chrJson.FACCIONES.NEXTRECOMPENSA},
            ${chrJson.FACCIONES.NIVELINGRESO},
            ${chrJson.FACCIONES.RARCAOS},
            ${chrJson.FACCIONES.RARREAL},
            ${chrJson.FACCIONES.RECCAOS},
            ${chrJson.FACCIONES.RECREAL},
            ${chrJson.FACCIONES.REENLISTADAS},
            ${chrJson.FACCIONES.REXCAOS},
            ${chrJson.FACCIONES.REXREAL},
            ${chrJson.FLAGS.BAN},
            ${chrJson.FLAGS.DESNUDO},
            ${chrJson.FLAGS.ENVENENADO},
            ${chrJson.FLAGS.ESCONDIDO},
            ${chrJson.FLAGS.HAMBRE},
            ${chrJson.FLAGS.LASTMAP},
            ${chrJson.FLAGS.MUERTO},
            ${chrJson.FLAGS.NAVEGANDO},
            ${chrJson.FLAGS.PARALIZADO},
            ${chrJson.FLAGS.SED},
            ${chrJson.INIT.ARMA},
            ${chrJson.INIT.BODY},
            ${chrJson.INIT.CASCO},
            ${chrJson.INIT.CLASE},
            ${chrJson.INIT.DESC},
            ${chrJson.INIT.ESCUDO},
            ${chrJson.INIT.GENERO},
            ${chrJson.INIT.HEAD},
            ${chrJson.INIT.HEADING},
            ${chrJson.INIT.HOGAR},
            ${chrJson.INIT.LASTIP1},
            ${chrJson.INIT.LOGGED},
            ${chrJson.INIT.PASSWORD},
            ${chrJson.INIT.POSITION},
            ${chrJson.INIT.RAZA},
            ${chrJson.INIT.UPTIME},
            ${chrJson.MASCOTAS.MAS1},
            ${chrJson.MASCOTAS.MAS2},
            ${chrJson.MASCOTAS.MAS3},
            ${chrJson.MASCOTAS.NROMASCOTAS},
            ${chrJson.MUERTES.NPCSMUERTES},
            ${chrJson.MUERTES.USERMUERTES},
            ${chrJson.REP.ASESINO},
            ${chrJson.REP.BANDIDO},
            ${chrJson.REP.BURGUESIA},
            ${chrJson.REP.LADRONES},
            ${chrJson.REP.NOBLES},
            ${chrJson.REP.PLEBE},
            ${chrJson.REP.PROMEDIO},
            ${chrJson.RESEARCH.TRAINNINGTIME},
            ${chrJson.STATS.BANCO},
            ${chrJson.STATS.ELU},
            ${chrJson.STATS.ELV},
            ${chrJson.STATS.EXP},
            ${chrJson.STATS.GLD},
            ${chrJson.STATS.MAXAGU},
            ${chrJson.STATS.MAXHAM},
            ${chrJson.STATS.MAXHIT},
            ${chrJson.STATS.MAXHP},
            ${chrJson.STATS.MAXMAN},
            ${chrJson.STATS.MAXSTA},
            ${chrJson.STATS.MINAGU},
            ${chrJson.STATS.MINHAM},
            ${chrJson.STATS.MINHIT},
            ${chrJson.STATS.MINHP},
            ${chrJson.STATS.MINMAN},
            ${chrJson.STATS.MINSTA},
            ${chrJson.STATS.SKILLPTSLIBRES})`;

           

    db.get().query(query, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });

};

exports.getCharfileByName = function(req, res, chrName) {
    try {
        let chrJson = readIniFile(`${chrJson.chrName}.chr`);
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
    // const directory = "";
    // let chrFilePath =  path.join(`./charfiles/${chrJson.chrName}.chr`);

    let files = fs.readdirSync('./charfiles/');
    files = files.filter(file => file.endsWith('.chr'));
    files.forEach(writeCharfileInDatabase);

};

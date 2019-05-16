const fs = require('fs');
const ini = require('ini');
const path = require('path');
const db = require('../db.js');
const { getAllGmsString } = require('../utils/server-configuration');

let charfilesInSqlArray = []

const CHARFILES_PATH = './server/Charfile/';

function readIniFile(chrName) {
    let chrFilePath = path.join(`${CHARFILES_PATH}/${chrName}`);
    return ini.decode(fs.readFileSync(chrFilePath, 'utf-8'));
}

function getFilterGmsClause() {
    let gameMasters = getAllGmsString();
    return `WHERE NOMBRE NOT IN (${gameMasters})`
}

exports.getCharfileByName = function (req, res, chrName) {
    try {
        let charfileJson = readIniFile(`${chrName}.chr`);
        res.status(200).json(charfileJson)
    } catch (err) {

        if (err.code === 'ENOENT') {
            res.status(404).send('El charfile no existe: ' + chrName);
            console.error('File not found!');
        } else {
            res.status(500)
        }
    }
};

exports.getCharByName = function (req, res, name) {
    db.get().query(`SELECT * FROM charfiles_worldsave WHERE NOMBRE = '${name}';`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllChars = function (req, res, name) {
    db.get().query(`SELECT * FROM charfiles_worldsave;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMaxLeverChars = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} ORDER BY CAST(STATS_ELV AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMoreHp = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} ORDER BY CAST(STATS_MAXHP AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMoreTimeOnline = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} ORDER BY CAST(INIT_UPTIME AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenNpcKiller = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} ORDER BY CAST(MUERTES_NPCSMUERTES AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenCharKiller = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} ORDER BY CAST(MUERTES_USERMUERTES AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMoreGoldChars = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} ORDER BY CAST(STATS_GLD AS UNSIGNED) DESC, CAST(STATS_BANCO AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllArmadaChars = function (req, res) {
    let gmsWhereFilterClause = getFilterGmsClause();

    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} AND WHERE FACCIONES_EJERCITOREAL = 1 ORDER by CAST(STATS_ELV AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllCaosChars = function (req, res) {
    db.get().query(`SELECT * FROM charfiles_worldsave ${gmsWhereFilterClause} AND WHERE FACCIONES_EJERCITOCAOS = 1 ORDER by CAST(STATS_ELV AS UNSIGNED) DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllGms= function (req, res) {
    let gameMasters = getGmsFromServerIni();
    res.status(200).json(gameMasters);
};

exports.getTimeLastUpdated = function (req, res) {
    db.get().query(`SELECT UPDATE_TIME FROM information_schema.tables WHERE TABLE_NAME = 'charfiles_worldsave';`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getCountChars = function (req, res) {
    db.get().query(`SELECT COUNT(id) as COUNT from charfiles_worldsave;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.backupCharfiles = async function (req, res) {
    try {
        //POR SI LAS MOSCAS
        //Primero creo la tabla, esto lo voy a hostear en db4free para no tener que pagar $$$
        //Y justamente por este motivo puede fallar y no tienen por que brindarte garantias,
        //Tambien podrian borrar el contenido de las mismas sin previo aviso dicen en su web/
        //Asi que por eso hago esto...
        const worldSaveSQLFixture = fs.readFileSync('./fixture/charfiles_worldsave.sql', 'utf8');

        console.info('==== CREANDO SI NO EXISTIESE TABLA charfiles_worldsave ======')
        await db.get().query(worldSaveSQLFixture);


        //Si no existe la tabla temporal que la cree
        await db.get().query('CREATE TABLE IF NOT EXISTS charfiles_worldsave_temporal LIKE charfiles_worldsave;')
        console.info('==== CREANDO TABLA charfiles_worldsave_temporal SI NO EXISTE======')


        //Por si existe, le borramos el contenido
        await db.get().query('TRUNCATE charfiles_worldsave_temporal')
        console.info('==== VACIANDO TABLA charfiles_worldsave_temporal ======')


        console.info('==== INICIANDO COPIA DE CHARFILES A TABLA charfiles_worldsave_temporal ======')
        //Primero limpiamos este array para que el resultado no tenga duplicados.
        charfilesInSqlArray = []

        //Se usa la tabla charfiles_worldsave_temporal en este proceso
        let files = fs.readdirSync(CHARFILES_PATH);
        files = files.filter(file => file.endsWith('.chr'));

        for (const file of files) {
            await writeCharfileWorldSaveTemporalTable(file)
        }

        await db.get().query('DROP TABLE IF EXISTS charfiles_worldsave')
        console.info('==== DROP TABLA charfiles_worldsave ======')

        await db.get().query('RENAME TABLE charfiles_worldsave_temporal TO charfiles_worldsave;')
        console.info('==== RENOMBRANDO TABLA charfiles_worldsave_temporal a charfiles_worldsave ======')

        res.status(200).json({ charfiles: charfilesInSqlArray });
    } catch (err) {
        res.status(500).send(err)
        console.error('function backupCharfiles: ' + err)
    }
};


async function truncateCharfileWorldSaveTable() {
    let query = 'TRUNCATE charfiles_worldsave'

    await db.get().query(query);
    console.info('Hecho, charfiles_worldsave vacia ');
}

async function writeCharfileWorldSaveTemporalTable(charfile) {
    let charfileJson = readIniFile(charfile);

    //Hacemos esto para usarlo como Nombre
    charfile = charfile.replace('.chr', '')

    let query = `INSERT INTO charfiles_worldsave_temporal (
        NOMBRE,
        ATRIBUTOS_AT1,
        ATRIBUTOS_AT2,
        ATRIBUTOS_AT3,
        ATRIBUTOS_AT4,
        ATRIBUTOS_AT5,
        CONSEJO_PERTENECE,
        CONSEJO_PERTENECECAOS,
        COUNTERS_PENA,
        COUNTERS_SKILLSASIGNADOS,
        FACCIONES_CIUDMATADOS,
        FACCIONES_CRIMMATADOS,
        FACCIONES_EJERCITOCAOS,
        FACCIONES_EJERCITOREAL,
        FACCIONES_FECHAINGRESO,
        FACCIONES_MATADOSINGRESO,
        FACCIONES_NEXTRECOMPENSA,
        FACCIONES_NIVELINGRESO,
        FACCIONES_RARCAOS,
        FACCIONES_RARREAL,
        FACCIONES_RECCAOS,
        FACCIONES_RECREAL,
        FACCIONES_REENLISTADAS,
        FACCIONES_REXCAOS,
        FACCIONES_REXREAL,
        FLAGS_BAN,
        FLAGS_DESNUDO,
        FLAGS_ENVENENADO,
        FLAGS_ESCONDIDO,
        FLAGS_HAMBRE,
        FLAGS_LASTMAP,
        FLAGS_MUERTO,
        FLAGS_NAVEGANDO,
        FLAGS_PARALIZADO,
        FLAGS_SED,
        INIT_ACCOUNTHASH,
        INIT_ARMA,
        INIT_BODY,
        INIT_CASCO,
        INIT_CLASE,
        INIT_DESC,
        INIT_ESCUDO,
        INIT_GENERO,
        INIT_HEAD,
        INIT_HEADING,
        INIT_HOGAR,
        INIT_LASTIP1,
        INIT_LOGGED,
        INIT_PASSWORD,
        INIT_POSITION,
        INIT_RAZA,
        INIT_UPTIME,
        MASCOTAS_MAS1,
        MASCOTAS_MAS2,
        MASCOTAS_MAS3,
        MASCOTAS_NROMASCOTAS,
        MUERTES_NPCSMUERTES,
        MUERTES_USERMUERTES,
        REP_ASESINO,
        REP_BANDIDO,
        REP_BURGUESIA,
        REP_LADRONES,
        REP_NOBLES,
        REP_PLEBE,
        REP_PROMEDIO,
        RESEARCH_TRAINNINGTIME,
        STATS_BANCO,
        STATS_ELU,
        STATS_ELV,
        STATS_EXP,
        STATS_GLD,
        STATS_MAXAGU,
        STATS_MAXHAM,
        STATS_MAXHIT,
        STATS_MAXHP,
        STATS_MAXMAN,
        STATS_MAXSTA,
        STATS_MINAGU,
        STATS_MINHAM,
        STATS_MINHIT,
        STATS_MINHP,
        STATS_MINMAN,
        STATS_MINSTA
        )

        VALUES (
        '${charfile}',
        '${charfileJson.ATRIBUTOS.AT1}',
        '${charfileJson.ATRIBUTOS.AT2}',
        '${charfileJson.ATRIBUTOS.AT3}',
        '${charfileJson.ATRIBUTOS.AT4}',
        '${charfileJson.ATRIBUTOS.AT5}',
        '${charfileJson.CONSEJO.PERTENECE}',
        '${charfileJson.CONSEJO.PERTENECECAOS}',
        '${charfileJson.COUNTERS.PENA}',
        '${charfileJson.COUNTERS.SKILLSASIGNADOS}',
        '${charfileJson.FACCIONES.CIUDMATADOS}',
        '${charfileJson.FACCIONES.CRIMMATADOS}',
        '${charfileJson.FACCIONES.EJERCITOCAOS}',
        '${charfileJson.FACCIONES.EJERCITOREAL}',
        '${charfileJson.FACCIONES.FECHAINGRESO}',
        '${charfileJson.FACCIONES.MATADOSINGRESO}',
        '${charfileJson.FACCIONES.NEXTRECOMPENSA}',
        '${charfileJson.FACCIONES.NIVELINGRESO}',
        '${charfileJson.FACCIONES.RARCAOS}',
        '${charfileJson.FACCIONES.RARREAL}',
        '${charfileJson.FACCIONES.RECCAOS}',
        '${charfileJson.FACCIONES.RECREAL}',
        '${charfileJson.FACCIONES.REENLISTADAS}',
        '${charfileJson.FACCIONES.REXCAOS}',
        '${charfileJson.FACCIONES.REXREAL}',
        '${charfileJson.FLAGS.BAN}',
        '${charfileJson.FLAGS.DESNUDO}',
        '${charfileJson.FLAGS.ENVENENADO}',
        '${charfileJson.FLAGS.ESCONDIDO}',
        '${charfileJson.FLAGS.HAMBRE}',
        '${charfileJson.FLAGS.LASTMAP}',
        '${charfileJson.FLAGS.MUERTO}',
        '${charfileJson.FLAGS.NAVEGANDO}',
        '${charfileJson.FLAGS.PARALIZADO}',
        '${charfileJson.FLAGS.SED}',
        '${charfileJson.INIT.ACCOUNTHASH}',
        '${charfileJson.INIT.ARMA}',
        '${charfileJson.INIT.BODY}',
        '${charfileJson.INIT.CASCO}',
        '${charfileJson.INIT.CLASE}',
        '${charfileJson.INIT.DESC}',
        '${charfileJson.INIT.ESCUDO}',
        '${charfileJson.INIT.GENERO}',
        '${charfileJson.INIT.HEAD}',
        '${charfileJson.INIT.HEADING}',
        '${charfileJson.INIT.HOGAR}',
        '${charfileJson.INIT.LASTIP1}',
        '${charfileJson.INIT.LOGGED}',
        '${charfileJson.INIT.PASSWORD}',
        '${charfileJson.INIT.POSITION}',
        '${charfileJson.INIT.RAZA}',
        '${charfileJson.INIT.UPTIME}',
        '${charfileJson.MASCOTAS.MAS1}',
        '${charfileJson.MASCOTAS.MAS2}',
        '${charfileJson.MASCOTAS.MAS3}',
        '${charfileJson.MASCOTAS.NROMASCOTAS}',
        '${charfileJson.MUERTES.NPCSMUERTES}',
        '${charfileJson.MUERTES.USERMUERTES}',
        '${charfileJson.REP.ASESINO}',
        '${charfileJson.REP.BANDIDO}',
        '${charfileJson.REP.BURGUESIA}',
        '${charfileJson.REP.LADRONES}',
        '${charfileJson.REP.NOBLES}',
        '${charfileJson.REP.PLEBE}',
        '${charfileJson.REP.PROMEDIO}',
        '${charfileJson.RESEARCH.TRAINNINGTIME}',
        '${charfileJson.STATS.BANCO}',
        '${charfileJson.STATS.ELU}',
        '${charfileJson.STATS.ELV}',
        '${charfileJson.STATS.EXP}',
        '${charfileJson.STATS.GLD}',
        '${charfileJson.STATS.MAXAGU}',
        '${charfileJson.STATS.MAXHAM}',
        '${charfileJson.STATS.MAXHIT}',
        '${charfileJson.STATS.MAXHP}',
        '${charfileJson.STATS.MAXMAN}',
        '${charfileJson.STATS.MAXSTA}',
        '${charfileJson.STATS.MINAGU}',
        '${charfileJson.STATS.MINHAM}',
        '${charfileJson.STATS.MINHIT}',
        '${charfileJson.STATS.MINHP}',
        '${charfileJson.STATS.MINMAN}',
        '${charfileJson.STATS.MINSTA}'
        )`;

    await db.get().query(query);
    charfilesInSqlArray.push(charfile)
    console.info(`Charfile: ${charfile} Guardado en base de datos correctamente`);
};
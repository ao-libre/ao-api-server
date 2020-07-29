const fs = require('fs');
const path = require('path');
const db = require('../db.js');
const { getAllGmsString } = require('../utils/server-configuration');

const LOGS_PATH = './server/Logs';
logsInSqlArray = [];
let workingInBackup = false;

async function hideIps(data) {
    var regex = new RegExp(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{2})?/, 'g');

    return data.replace(regex, ' IP OCULTA =)');
}

exports.getAllGmsLogs = async function (req, res) {
    try {
        let gameMasters = getAllGmsString();

        let [rows] = await db.get().query(`SELECT * FROM logs_worldsave where filename in (${gameMasters});`);
        
        for (const row of rows) {
            row.log = await hideIps(row.log)
        }
        
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getErrorsLogs = async function (req, res) {
    db.get().query(`SELECT * FROM logs_worldsave where filename in ('errores', 'ip', 'eventos');`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(results);
    });
}

exports.getBackupsLogs = async function (req, res) {
    db.get().query(`SELECT * FROM logs_worldsave where filename = 'backups';`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(results);
    });
}

exports.getNumUsersLogs = async function (req, res) {
    db.get().query(`SELECT * FROM logs_worldsave where filename = 'numusers';`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        const usersOnlineDB = results.pop().log.replace('/\r?\n|\r/g', '').trim();
        return res.status(200).json({onlines: usersOnlineDB});
    });
}

exports.getStatisticsLogs = async function (req, res) {
    db.get().query(`SELECT * FROM logs_worldsave where filename = 'statistics';`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(results);
    });
}

exports.getMainLogs = async function (req, res) {
    db.get().query(`SELECT * FROM logs_worldsave where filename = 'Main';`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(results);
    });
}

exports.getDesarrolloLogs = async function (req, res) {
    db.get().query(`SELECT * FROM logs_worldsave where filename like '%desarrollo%';`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(results);
    });
}

exports.getTimeLastUpdated = function (req, res) {
    db.get().query(`SELECT UPDATE_TIME FROM information_schema.tables WHERE TABLE_NAME = 'logs_worldsave';`, function (err, results, fields) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(results);
    });
};

exports.backupLogs = async function (req, res) {
    if (workingInBackup) { return; }

    try {
        workingInBackup = true;
        //HACER REFACTOR DE ESTO Y PONERLO EN ALGUN LUGAR COPADO
        //ESTO LO HAGO COMO EN 5 LADOS YA XD

        //POR SI LAS MOSCAS
        //Primero creo la tabla, esto lo voy a hostear en db4free para no tener que pagar $$$
        //Y justamente por este motivo puede fallar y no tienen por que brindarte garantias,
        //Tambien podrian borrar el contenido de las mismas sin previo aviso dicen en su web/
        //Asi que por eso hago esto...
        const logsSQLFixture = fs.readFileSync('./fixture/logs_worldsave.sql', 'utf8');

        console.info('==== CREANDO SI NO EXISTIESE TABLA logs_worldsave ======')
        await db.get().query(logsSQLFixture);


        //Si no existe la tabla temporal que la cree
        await db.get().query('CREATE TABLE IF NOT EXISTS logs_worldsave_temporal LIKE logs_worldsave;')
        console.info('==== CREANDO TABLA logs_worldsave_temporal SI NO EXISTE======')


        //Por si existe, le borramos el contenido
        await db.get().query('TRUNCATE logs_worldsave_temporal')
        console.info('==== VACIANDO TABLA logs_worldsave_temporal ======')


        console.info('==== INICIANDO COPIA DE CHARFILES A TABLA logs_worldsave_temporal ======')
        //Primero limpiamos este array para que el resultado no tenga duplicados.
        logsInSqlArray = []

        //Se usa la tabla logs_worldsave_temporal en este proceso
        let files = fs.readdirSync(LOGS_PATH);
        files = files.filter(file => file.endsWith('.log'));

        for (const file of files) {
            await writeLogsWorldSaveTemporalTable(file)
        }

        await db.get().query('DROP TABLE IF EXISTS logs_worldsave')
        console.info('==== DROP TABLA logs_worldsave ======')

        await db.get().query('RENAME TABLE logs_worldsave_temporal TO logs_worldsave;')
        console.info('==== RENOMBRANDO TABLA logs_worldsave_temporal a logs_worldsave ======')

        return res.status(200).json({ logs: logsInSqlArray });
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', 'function backupLogs: ' + err)
        return res.status(500).send(err)
    }
};

async function writeLogsWorldSaveTemporalTable (file) {
    const logFilePath = path.join(`${LOGS_PATH}/${file}`);

    const logFileContent = fs.readFileSync(logFilePath, 'utf8')
    file = file.replace('.log', '')

    const query = `INSERT INTO logs_worldsave_temporal (
            filename,
            log
            )
            VALUES (
            '${file}',
            '${logFileContent}'
            )`;

    await db.get().query(query);
    // console.info(`Log: ${file} Guardado en base de datos correctamente, Length: ${logFileContent.length}`);
    logsInSqlArray.push(file);
}

const fs = require('fs');
const path = require('path');
const db = require('../db.js');

const LOGS_PATH = './server/Logs';
logsInSqlArray = [];

async function writeLogsOnDatabase (file) {

    const query = `LOAD DATA INFILE '${LOGS_PATH}/${file}' INTO TABLE logs_worldsave_temporal;`
console.log(query)
    await db.get().query(query);
    console.info(`Log: ${file} Guardado en base de datos correctamente`);
    logsInSqlArray.push(file);
}

exports.backupLogs = async function (req, res) {
    try {
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
        files.forEach(writeLogsOnDatabase)

        await db.get().query('DROP TABLE IF EXISTS logs_worldsave')
        console.info('==== DROP TABLA logs_worldsave ======')

        await db.get().query('RENAME TABLE logs_worldsave_temporal TO logs_worldsave;')
        console.info('==== RENOMBRANDO TABLA logs_worldsave_temporal a logs_worldsave ======')

        res.status(200).json({ logs: logsInSqlArray });
    } catch (err) {
        res.status(500).send(err)
        console.error('function backupLogs: ' + err)
    }
};

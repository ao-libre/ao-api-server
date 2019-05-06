const fs = require('fs');
const ini = require('ini');
const path = require('path');
const db = require('../db.js');

let accountInSqlArray = []

function readIniFile(accountHash){
    let chrFilePath =  path.join(`./accounts/${accountHash}`);
    return ini.decode(fs.readFileSync(chrFilePath, 'utf-8'));
}

async function writeAccountWorldSaveTemporalTable(accountHash) {
    let accountJson = readIniFile(accountHash);
    console.log(accountHash)
    console.log(accountJson)

    //Hacemos esto para usarlo como ACCOUNTHASH
    accountHash = accountHash.replace('.ach', '')

    let query = `INSERT INTO accounts_worldsave_temporal (
        ACCOUNTHASH,
        INIT_CANTIDADPERSONAJES,
        INIT_USERNAME,
        PERSONAJE1,
        PERSONAJE2,
        PERSONAJE3,
        PERSONAJE4,
        PERSONAJE5,
        PERSONAJE6,
        PERSONAJE7,
        PERSONAJE8,
        PERSONAJE9,
        PERSONAJE10
        )

        VALUES (
        '${accountHash}',
        '${accountJson.INIT.CANTIDADPERSONAJES}',
        '${accountJson.INIT.USERNAME}',
        '${accountJson.PERSONAJES.Personaje1}',
        '${accountJson.PERSONAJES.Personaje2}',
        '${accountJson.PERSONAJES.Personaje3}',
        '${accountJson.PERSONAJES.Personaje4}',
        '${accountJson.PERSONAJES.Personaje5}',
        '${accountJson.PERSONAJES.Personaje6}',
        '${accountJson.PERSONAJES.Personaje7}',
        '${accountJson.PERSONAJES.Personaje8}',
        '${accountJson.PERSONAJES.Personaje9}',
        '${accountJson.PERSONAJES.Personaje10}')`;

    await db.get().query(query);
    accountInSqlArray.push(accountJson.INIT.USERNAME);
    console.info(`${accountHash} Guardado en base de datos correctamente`);
};
exports.backupAccountFiles = async function(req, res) {
    try {
        //POR SI LAS MOSCAS
        //Primero creo la tabla, esto lo voy a hostear en db4free para no tener que pagar $$$
        //Y justamente por este motivo puede fallar y no tienen por que brindarte garantias,
        //Tambien podrian borrar el contenido de las mismas sin previo aviso dicen en su web/
        //Asi que por eso hago esto...
        const worldSaveAccountTableSQLFixture = fs.readFileSync('./fixture/accounts_worldsave.sql', 'utf8');
        
        console.info('==== CREANDO SI NO EXISTIESE TABLA accounts_worldsave ======')
        await db.get().query(worldSaveAccountTableSQLFixture);

        
        console.info('==== CREANDO TABLA charfiles_worldsave_temporal SI NO EXISTE======')
        //Si no existe la tabla temporal que la cree
        await db.get().query('CREATE TABLE IF NOT EXISTS accounts_worldsave_temporal LIKE accounts_worldsave;')

        
        console.info('==== VACIANDO TABLA charfiles_worldsave_temporal ======')
        //Por si existe, le borramos el contenido
        await db.get().query('TRUNCATE accounts_worldsave_temporal')

        
        console.info('==== INICIANDO COPIA DE CHARFILES A TABLA charfiles_worldsave_temporal ======')
        //Primero limpiamos este array para que el resultado no tenga duplicados.
        accountInSqlArray = []

        //Se usa la tabla accounts_worldsave_temporal en este proceso
        let files = fs.readdirSync('./accounts/');
        files = files.filter(file => file.endsWith('.ach'));
        files.forEach(writeAccountWorldSaveTemporalTable)
        
        
        console.info('==== DROP TABLA accounts_worldsave ======')
        await db.get().query('DROP TABLE IF EXISTS accounts_worldsave')

        console.info('==== RENOMBRANDO TABLA accounts_worldsave_temporal a accounts_worldsave ======')
        await db.get().query('RENAME TABLE accounts_worldsave_temporal TO accounts_worldsave;')

        res.status(200).json({accounts: accountInSqlArray});
    } catch(err) {
        res.status(500).send(err)
        console.error('function backupAccountFiles: ' + err)
    }
};
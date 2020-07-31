const fs = require('fs');
const ini = require('ini');
const path = require('path');
const db = require('../db.js');
const sha256 = require('js-sha256');
const INI_EASY = require('easy-ini');
const { type } = require('os');

let accountInSqlArray = []
let workingInBackup = false;

const ACCOUNTS_PATH = './server/Account/';
const CHARFILES_PATH = './server/Charfile/'; 

function readIniFile(fileName){
    try {
        let chrFilePath =  path.join(`${ACCOUNTS_PATH}/${fileName}`);
        return ini.decode(fs.readFileSync(chrFilePath, 'utf-8'));
    } catch (err) {
        return res.status(500).send(err.toString())
    }  
}

function writeIniFile(fileName, fileContent){
    fs.writeFileSync(`${ACCOUNTS_PATH}/${fileName}`, ini.stringify(fileContent))
}

async function writeAccountWorldSaveTemporalTable(accountHash) {
    let accountJson = readIniFile(accountHash);

    //Hacemos esta validacion por si es una cuenta sin personajes... sino explota :(
    if (accountJson.PERSONAJES) {
        //We do this validation to avoid undefined on the database
        accountJson.PERSONAJES.Personaje1 ? accountJson.PERSONAJES.Personaje1 = accountJson.PERSONAJES.Personaje1 : null
        accountJson.PERSONAJES.Personaje2 ? accountJson.PERSONAJES.Personaje2 = accountJson.PERSONAJES.Personaje2 : null
        accountJson.PERSONAJES.Personaje3 ? accountJson.PERSONAJES.Personaje3 = accountJson.PERSONAJES.Personaje3 : null
        accountJson.PERSONAJES.Personaje4 ? accountJson.PERSONAJES.Personaje4 = accountJson.PERSONAJES.Personaje4 : null
        accountJson.PERSONAJES.Personaje5 ? accountJson.PERSONAJES.Personaje5 = accountJson.PERSONAJES.Personaje5 : null
        accountJson.PERSONAJES.Personaje6 ? accountJson.PERSONAJES.Personaje6 = accountJson.PERSONAJES.Personaje6 : null
        accountJson.PERSONAJES.Personaje7 ? accountJson.PERSONAJES.Personaje7 = accountJson.PERSONAJES.Personaje7 : null
        accountJson.PERSONAJES.Personaje8 ? accountJson.PERSONAJES.Personaje8 = accountJson.PERSONAJES.Personaje8 : null
        accountJson.PERSONAJES.Personaje9 ? accountJson.PERSONAJES.Personaje9 = accountJson.PERSONAJES.Personaje9 : null
        accountJson.PERSONAJES.Personaje10 ? accountJson.PERSONAJES.Personaje10 = accountJson.PERSONAJES.Personaje10 : null
    } else {
        //We do this validation to avoid undefined on the database
        accountJson.PERSONAJES = {};
        accountJson.PERSONAJES.Personaje1 = null
        accountJson.PERSONAJES.Personaje2 = null
        accountJson.PERSONAJES.Personaje3 = null
        accountJson.PERSONAJES.Personaje4 = null
        accountJson.PERSONAJES.Personaje5 = null
        accountJson.PERSONAJES.Personaje6 = null
        accountJson.PERSONAJES.Personaje7 = null
        accountJson.PERSONAJES.Personaje8 = null
        accountJson.PERSONAJES.Personaje9 = null
        accountJson.PERSONAJES.Personaje10 = null
    }


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
        '${accountJson.PERSONAJES.Personaje10}'
        )`;

    await db.get().query(query);
    accountInSqlArray.push(accountJson.INIT.USERNAME);
    // console.info(`Cuenta: ${accountHash} Guardado en base de datos correctamente`);
};

exports.backupAccountFiles = async function(req, res) {
    if (workingInBackup) { return; }

    try {
        workingInBackup = true;
        //POR SI LAS MOSCAS
        //Primero creo la tabla, esto lo voy a hostear en db4free para no tener que pagar $$$
        //Y justamente por este motivo puede fallar y no tienen por que brindarte garantias,
        //Tambien podrian borrar el contenido de las mismas sin previo aviso dicen en su web/
        //Asi que por eso hago esto...
        const worldSaveAccountTableSQLFixture = fs.readFileSync('./fixture/accounts_worldsave.sql', 'utf8');
        
        console.info('==== CREANDO SI NO EXISTIESE TABLA accounts_worldsave ======')
        await db.get().query(worldSaveAccountTableSQLFixture);


        //El proceso se hace en una tabla temporal para nunca perder o dejar sin funcionar otras aplicaciones que leen la bd como el ranking de la pagina
        //Si no existe la tabla temporal que la cree
        await db.get().query('CREATE TABLE IF NOT EXISTS accounts_worldsave_temporal LIKE accounts_worldsave;')
        console.info('==== CREANDO TABLA charfiles_worldsave_temporal SI NO EXISTE======')

        
        //Por si existe, le borramos el contenido
        await db.get().query('TRUNCATE accounts_worldsave_temporal')
        console.info('==== VACIANDO TABLA charfiles_worldsave_temporal ======')

        
        console.info('==== INICIANDO COPIA DE CHARFILES A TABLA charfiles_worldsave_temporal ======')
        //Primero limpiamos este array para que el resultado no tenga duplicados.
        accountInSqlArray = []

        //Se usa la tabla accounts_worldsave_temporal en este proceso
        let files = fs.readdirSync(ACCOUNTS_PATH);
        files = files.filter(file => file.endsWith('.ach'));
        
        for (const file of files) {
            await writeAccountWorldSaveTemporalTable(file)
        }

        await db.get().query('DROP TABLE IF EXISTS accounts_worldsave')
        console.info('==== DROP TABLA accounts_worldsave ======')

        await db.get().query('RENAME TABLE accounts_worldsave_temporal TO accounts_worldsave;')
        console.info('==== RENOMBRANDO TABLA accounts_worldsave_temporal a accounts_worldsave ======')

        workingInBackup = false;

        return res.status(200).json({accounts: accountInSqlArray});
    } catch(err) {
        console.error('\x1b[31m%s\x1b[0m', 'function backupAccountFiles: ' + err)
        return res.status(500).send(err.toString())
    }
};

exports.resetPassword = async function (req, res, email, newPassword) {
    try {
        const accFilePath = path.join(`${ACCOUNTS_PATH}/${email}.acc`);

        const accountContent = fs.readFileSync(accFilePath, 'utf-8');
        const accountIni = new INI_EASY(accountContent);
    
        const INIT = accountIni.iniData.find(x => x.name == "[INIT]")
    
        INIT.content.find(x => x.key === "PASSWORD").val = newPassword

        //Hacemos esto por que el hash de password se graba mal a veces con la otra libreria.
        fs.writeFileSync(accFilePath, accountIni.createINIString());

        console.info(`Password de la cuenta ${email} fue cambiado correctamente por: ${newPassword}`)
        return res.status(200).send(`Password de la cuenta ${email} fue cambiado correctamente :)`);
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', 'function resetPassword: ' + err)
        return res.status(500).send(err.toString())
    }
};

exports.resetAllAccounts = async function (req, res) {
    //Hacemos este proceso para no tener que borrar nuestros usuarios y asi no tener que perder la base de jugadores. :)

    //Borramos los personajes en todos los CHARFILES
    fs.readdir(ACCOUNTS_PATH, async (err, files) => {

        const filteredFiles = files.filter(x=> x.includes('.ach'))

        filteredFiles.forEach(file => {
            console.log("Reseteando archivo: ", file)
            let accountJson = readIniFile(file);

            accountJson.INIT.CANTIDADPERSONAJES = 0
            
            if (accountJson.PERSONAJES) {
                delete accountJson.PERSONAJES.Personaje1
                delete accountJson.PERSONAJES.Personaje2
                delete accountJson.PERSONAJES.Personaje3
                delete accountJson.PERSONAJES.Personaje4
                delete accountJson.PERSONAJES.Personaje5
                delete accountJson.PERSONAJES.Personaje6
                delete accountJson.PERSONAJES.Personaje7
                delete accountJson.PERSONAJES.Personaje8
                delete accountJson.PERSONAJES.Personaje9
                delete accountJson.PERSONAJES.Personaje10
            }

            writeIniFile(file, accountJson);
        });
    });

    //Borramos todos los archivos de la carpeta CHARFILE
    fs.readdir(CHARFILES_PATH, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(CHARFILES_PATH, file), err => {
            if (err) throw err;
          });
        }
    });

    return res.status(200).send(`Se reseteo el server correctamente, todas las cuentas estan limpias`);
};

exports.login = async function (req, res, email, password) {
    if (email == null || password == null) { 
        return res.status(500).send(`Faltan parámetros para procesar esta petición.`) 
    }

    // Obtenemos la info. de la cuenta
    const accountData = readIniFile(`${email}.acc`)

    const salt = accountData.INIT.SALT;
    const inputPassword = sha256(password + salt);
    const encryptedPassword = accountData.INIT.PASSWORD;

    if (inputPassword === encryptedPassword) {
        
        // NO enviamos la contraseña y el salt.
        delete accountData.INIT.SALT;
        delete accountData.INIT.PASSWORD;
        
        // Devolvemos un JSON con el resto de la informacion de la cuenta.
        return res.status(200).json(accountData)
        
        // return res.status(200).send(`Has iniciado sesion correctamente`)
    } else {
        return res.status(403).send(`Usuario y/o contraseña invalidos.`)
    }
}
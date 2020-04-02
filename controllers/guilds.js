const express = require('express');
const ini = require('ini');
const db = require('../db.js');
const fs = require('fs');
const fsExtra = require('fs-extra');
const app = express();

const GUILDS_PATH = './server/Guilds';
const CHARS_PATH = './server/Charfile';

app.get("/deleteAndResetGuilds", async function (req, res) {
    try {
        
        let [rows] = await db.get().query(`SELECT * FROM charfiles_worldsave;`);
        rows.forEach(async char => {
            try {
                const charfileName = `${CHARS_PATH}/${char.NOMBRE}.chr`
                const charIni = ini.decode(fs.readFileSync(charfileName, 'utf-8'));
    
                delete charIni.GUILD;
                

                fs.writeFileSync(charfileName, ini.stringify(charIni));
                console.info('El charfile se modifico correctamente: ' + char.NOMBRE);

            }catch(err){
                //console.error('No se encontro el archivo: ' + char.NOMBRE)
            }

        });

        fsExtra.emptyDirSync(GUILDS_PATH)

        const guildinfoDefaultValue = "[INIT]\nnroGuilds=0\n"
        fs.writeFileSync(GUILDS_PATH + "/guildsinfo.inf", guildinfoDefaultValue)
        
        return res.status(200).send("Los clanes fueron borrados y los usuarios eliminados de sus clanes con exito");
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }

});

module.exports = app;
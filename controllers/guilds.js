const express = require('express');
const INI = require('easy-ini')
const db = require('../db.js');
const fs = require('fs');
const fsExtra = require('fs-extra');
const app = express();

const GUILDS_PATH = './server/Guilds';
const CHARS_PATH = './server/Charfile';

app.get("/deleteAndResetGuilds", async function (req, res) {

    if (process.env.ADMIN_PASSWORD != req.body.password) {
        return res.status(401).send('No estas autorizado a entrar... :(');
    }

    try {
        
        let chars = fs.readdirSync(CHARS_PATH)
        chars = chars.filter(x=> x.includes('.chr'));
        console.log(chars)


        // let [chars] = await db.get().query(`SELECT * FROM charfiles_worldsave;`);
        chars.forEach(async char => {
            const charfileName = `${CHARS_PATH}/${char}`
            
            try {
                const charfileContent = fs.readFileSync(charfileName, 'utf-8');
                const charIni = new INI(charfileContent);
                
                // Remove an entire section
                charIni.findAndRemoveSectionIfExists('[GUILD]')
                
                fs.writeFileSync(charfileName, charIni.createINIString());
                console.info('El charfile se modifico correctamente: ' + char);

            }catch(err){
                console.error('No se encontro el archivo: ' + charfileName)
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
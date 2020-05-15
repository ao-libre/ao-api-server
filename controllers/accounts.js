const express = require('express');
const app = express();
const account = require('../models/account.js');
const fsExtra = require('fs-extra');
const fs = require('fs');

const GUILDS_PATH = './server/Guilds';

app.get("/backupaccountfiles", function (req, res) {
    account.backupAccountFiles(req, res);
});

app.get("/resetPassword/:email/:newPassword", function (req, res) {
    //Email es lo mismo cuenta...
    account.resetPassword(req, res, req.params.email, req.params.newPassword);
});

app.get("/resetAllAccounts/:adminPassword", function (req, res) {
    if (process.env.ADMIN_PASSWORD === req.params.adminPassword) {
        account.resetAllAccounts(req, res);

        //Eliminamos clanes 
        fsExtra.emptyDirSync(GUILDS_PATH)

        //Reseteamos archivo de clanes.
        const guildinfoDefaultValue = "[INIT]\nnroGuilds=0\n"
        fs.writeFileSync(GUILDS_PATH + "/guildsinfo.inf", guildinfoDefaultValue)
    }else {
        return res.status(401).send("LA PASSWORD ES INCORRECTA");
    }
});

module.exports = app;

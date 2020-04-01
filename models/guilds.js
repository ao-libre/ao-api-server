const fs = require('fs');
const path = require('path');
const db = require('../db.js');
const { getAllGmsString } = require('../utils/server-configuration');

const LOGS_PATH = './server/Logs';
logsInSqlArray = [];

async function hideIps(data) {
    var regex = new RegExp(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{2})?/, 'g');

    return data.replace(regex, 'IP OCULTA :)');
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
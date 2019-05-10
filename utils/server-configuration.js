const fs = require('fs');
const ini = require('ini');
const path = require('path');

function getServerIniFile() {
    let serverFilePath = path.join(`./server/Server.ini`);
    return ini.decode(fs.readFileSync(serverFilePath, 'utf-8'));
}

module.exports = {

    getGmsFromServerIni: function () {
        let serverIni = getServerIniFile();
        const gameMasters = [];
        
        for (i = 1; i <= serverIni.INIT.Admines; i++) {
            let adminNumber = "Admin" + i;
            gameMasters.push(serverIni.Admines[adminNumber]);
        } 

        for (i = 1; i <= serverIni.INIT.Dioses; i++) {
            let diosNumber = "Dios" + i;
            gameMasters.push(serverIni.Dioses[diosNumber]);
        }

        for (i = 1; i <= serverIni.INIT.SemiDioses; i++) {
            let semiDiosNumber = "SemiDios" + i;
            gameMasters.push(serverIni.SemiDioses[semiDiosNumber]);
        } 

        for (i = 1; i <= serverIni.INIT.Consejeros; i++) {
            let consejeroNumber = "Consejero" + i;
            gameMasters.push(serverIni.Consejeros[consejeroNumber]);
        } 

        for (i = 1; i <= serverIni.INIT.RolesMasters; i++) {
            let roleMasterNumber = "RolesMaster" + i;
            gameMasters.push(serverIni.RolesMasters[roleMasterNumber]);
        } 

        //Por si las dudas hago esto ya que pueden poner Admin5 y tan solo setear 3 admines y me tira undefined
        return gameMasters.filter(gm => gm !== undefined);
    },

}
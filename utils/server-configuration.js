const fs = require('fs');
const ini = require('ini');
const path = require('path');

function getServerIniFile() {
    let serverFilePath = path.join(`./server/Server.ini`);
    return ini.decode(fs.readFileSync(serverFilePath, 'utf-8'));
}

function getParsedGmsFromServerIni() {
    let serverIni = getServerIniFile();
    const gameMasters = {
        admines: [],
        dioses: [],
        semidioses: [],
        consejeros: [],
        rolemasters: [],
    };
    
    for (i = 1; i <= serverIni.INIT.Admines; i++) {
        let adminNumber = "Admin" + i;
        gameMasters.admines.push(serverIni.Admines[adminNumber]);
    } 

    for (i = 1; i <= serverIni.INIT.Dioses; i++) {
        let diosNumber = "Dios" + i;
        gameMasters.dioses.push(serverIni.Dioses[diosNumber]);
    }

    for (i = 1; i <= serverIni.INIT.SemiDioses; i++) {
        let semiDiosNumber = "SemiDios" + i;
        gameMasters.semidioses.push(serverIni.SemiDioses[semiDiosNumber]);
    } 

    for (i = 1; i <= serverIni.INIT.Consejeros; i++) {
        let consejeroNumber = "Consejero" + i;
        gameMasters.consejeros.push(serverIni.Consejeros[consejeroNumber]);
    } 

    for (i = 1; i <= serverIni.INIT.RolesMasters; i++) {
        let roleMasterNumber = "RolesMaster" + i;
        gameMasters.rolemasters.push(serverIni.RolesMasters[roleMasterNumber]);
    } 

    //Por si las dudas hago esto ya que pueden poner Admin5 y tan solo setear 3 admines y me tira undefined
    gameMasters.admines = gameMasters.admines.filter(gm => gm !== Boolean);
    gameMasters.dioses = gameMasters.dioses.filter(gm => gm !== Boolean);
    gameMasters.semidioses = gameMasters.semidioses.filter(gm => gm !== Boolean);
    gameMasters.consejeros = gameMasters.consejeros.filter(gm => gm !== Boolean);
    gameMasters.rolemasters = gameMasters.rolemasters.filter(gm => gm !== Boolean);

    return gameMasters
}


module.exports = {
    getGmsFromServerIni: function() {
        return getParsedGmsFromServerIni()
    },

    getAllGmsString: function () {
        const gameMasters = getParsedGmsFromServerIni()
        let gmsNames = '';
    
        //Separo los elementos del array, pero le agrego '
        gmsNames += (gameMasters.admines.map(i => `'${i}'`).join(','));
        gameMasters.dioses.length > 0 ? gmsNames += `, ${(gameMasters.dioses.map(i => `'${i}'`).join(','))}` : '';
        gameMasters.semidioses.length > 0 ? gmsNames += `, ${gameMasters.semidioses.map(i => `'${i}'`).join(',')}` : '';
        gameMasters.consejeros.length > 0 ? gmsNames += `, ${gameMasters.consejeros.map(i => `'${i}'`).join(',')}` : '';
        gameMasters.rolemasters.length > 0 ? gmsNames += `, ${gameMasters.rolemasters.map(i => `'${i}'`).join(',')}` : '';

        return gmsNames;
    },

    

}
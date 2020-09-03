const express = require('express');
const app = express();
const ip = require("ip");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.post("/sendUsersOnline", function (req, res) {
    const serverInfo =  `${req.body.ip}:${req.body.port}`;
    global.serversOnlineQuantityUsers = global.serversOnlineQuantityUsers.filter(x => x.ipAndPort !== serverInfo)

    let serverName = req.body.serverName
    if (serverInfo === `${ip.address()}:7666`){
        serverName = "Servidor Principal"
    }

    global.serversOnlineQuantityUsers.push({
        serverName: serverName,
        quantityUsers: req.body.quantityUsers,
        ipAndPort: serverInfo,
        dateTime: new Date()
    })
    
    global.serversOnlineQuantityUsers.sort(function(obj1, obj2) {
        // Ascending: first age less than the previous
        return obj2.quantityUsers - obj1.quantityUsers;
    });

    return res.status(200).json(global.serversOnlineQuantityUsers);
});

app.get("/getOnlineUsersFromAllServers", function (req, res) {
    return res.status(200).json({serversInfo: global.serversOnlineQuantityUsers});
});

app.get("/getRandomComic", function (req, res) {
    const imageNumber = randomIntFromInterval(1, 222)

    return res.status(200).json({comicImage: `https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/comics/Comic${imageNumber}.png`});
});

module.exports = app;

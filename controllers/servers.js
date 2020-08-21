const express = require('express');
const app = express();

app.post("/sendUsersOnline", function (req, res) {
    const serverInfo =  `${req.body.ip}:${req.body.port}`;
    global.serversOnlineQuantityUsers = global.serversOnlineQuantityUsers.filter(x => x.ipAndPort !== serverInfo)

    let serverName = req.body.serverName
    if (serverInfo === "18.230.151.33:7666"){
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

module.exports = app;

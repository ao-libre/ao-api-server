const express = require('express');
const app = express();

app.post("/sendUsersOnline", function (req, res) {
    const serverInfo =  `${req.body.ip}:${req.body.port}`;
    global.serversOnlineQuantityUsers = global.serversOnlineQuantityUsers.filter(x => x.ipAndPort !== serverInfo)

    global.serversOnlineQuantityUsers.push({
        serverName: req.body.serverName,
        quantityUsers: req.body.quantityUsers,
        ipAndPort: serverInfo,
        dateTime: new Date()
    })

    return res.status(200).json(global.serversOnlineQuantityUsers);
});

app.get("/getOnlineUsersFromAllServers", function (req, res) {
    return res.status(200).json(global.serversOnlineQuantityUsers);
});

module.exports = app;

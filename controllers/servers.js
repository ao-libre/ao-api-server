const express = require('express');
const app = express();

app.post("/sendUsersOnline", function (req, res) {
    global.serversOnlineQuantityUsers = global.serversOnlineQuantityUsers.filter(x => x.serverName !== req.body.serverName)

    global.serversOnlineQuantityUsers.push({
        serverName: req.body.serverName,
        quantity: req.body.quantity,
        dateTime: new Date()
    })

    return res.status(200).json(global.serversOnlineQuantityUsers);
});

app.get("/getOnlineUsersFromAllServers", function (req, res) {
    return res.status(200).json(global.serversOnlineQuantityUsers);
});

module.exports = app;

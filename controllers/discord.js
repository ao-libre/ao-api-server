const express = require('express');
const app = express();
const Discord = require('discord.js');

app.post("/sendConnectedMessage/", function (req, res) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    let username = req.body.userName
    let desc = req.body.desc

    console.log( req.body.userName,  req.body.desc,  req.body)

    if (desc === "") {
        desc = "El personaje no tiene descripcion, que alguien entre al juego y le explique como poner algo :)"
    }

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${username} se ha conectado al server de ROL Alkon 0.13.X`)
        // Set the color of the embed
        .setColor(0x36cd80)
        // Set the main content of the embed
        .setDescription(desc);


    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

module.exports = app;
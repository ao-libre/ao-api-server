const express = require('express');
const app = express();
const Discord = require('discord.js');

app.post("/sendMessage/", function (req, res) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    let username = req.body.username
    let desc = req.body.desc

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${username} se ha conectado al server Alkon 0.13`)
        // Set the color of the embed
        .setColor(0x36cd80)
        // Set the main content of the embed
        .setDescription(desc);


    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

module.exports = app;
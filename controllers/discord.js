const express = require('express');
const app = express();
const Discord = require('discord.js');

const website = "http://www.ArgentumOnline.org - AO Libre";
const iconFooter = "https://raw.githubusercontent.com/ao-libre/ao-website/master/assets/images/favicon.png";
const iconClassic = "https://cdn.discordapp.com/attachments/523242255230697490/612483417107595275/icon-256.png";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.post("/sendConnectedMessage/", function (req, res) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    let username = req.body.userName
    let desc = req.body.desc
    let esCriminal = req.body.esCriminal
    let clase = req.body.clase

    if (desc === "") {
        desc = "El personaje no tiene descripcion, dentro del juego || Con el comando /desc podes cambiarla"
    }

    let color = (esCriminal.toLowerCase() === "true") ? 0xcc1b1b : 0x1ba1e2
    
    clase = clase.toLowerCase();
    if (clase === "trabajador") {
        clase = clase + randomIntFromInterval(0, 5);
    }

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${username} se ha conectado al server de ROL Alkon 0.13.X`)
        // Set the color of the embed
        .setColor(color)
        .setImage(`https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/${clase}.jpg`)

        // Set the main content of the embed
        .setFooter(website, iconFooter)
        .setDescription(desc);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendHappyHourStartMessage/", function (req, res) {
    let message = req.body.message

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Empezo el Happy Hour!!`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/happy-hour-start-discord.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0xffe700)
        // Set the main content of the embed
        .setDescription(message);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendHappyHourEndMessage/", function (req, res) {
    let message = req.body.message

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Termino el Happy Hour!!`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/happy-hour-end-discord.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x641b06)
        // Set the main content of the embed
        .setDescription(message);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendHappyHourModifiedMessage/", function (req, res) {
    let message = req.body.message

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Termino el Happy Hour!!`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/happy-hour-modify-discord.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x641b06)
        // Set the main content of the embed
        .setDescription(message);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendNewGuildCreated/", function (req, res) {
    let message = req.body.message
    let desc = req.body.desc
    let guildName = req.body.guildname
    let site = req.body.site

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${guildName} Un nuevo clan se ha formado en estas tierras (Alkon 0.13.X)`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-cliente/master/Graficos/Interfaces/VentanaFundarClan.jpg')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x9d01d4)
        // Set the main content of the embed
        .setDescription(`${message} - ${desc} - ${site} -- Manual para crear clanes: http://wiki.argentumonline.org/index0a56.html?seccion=clanes#ver`);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendWorldSaveMessage/", function (req, res) {
    let message = "Sabias que en http://wiki.argentumonline.org tenes la guia y en nuestro reddit guias de entrenamiento para cada raza?"

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Se inicio el World Save - Actualizacion de Rankings (Alkon 0.13.X)`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/world-save-discord.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0xffffff)
        .setURL('http://www.argentumonline.org')
        // Set the main content of the embed
        .setDescription(message);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendCreatedNewCharacterMessage/", function (req, res) {
    let name = req.body.name

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${name} ha nacido en las tierras de Argentum (Alkon 0.13.X)`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/newbie-discord.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x0eedff)
        // Set the main content of the embed
        .setDescription(`Ayuden al newbie a entender el juego, en esta guia podras encontrar una gran ayuda para esta nueva aventura http://wiki.argentumonline.org.`)

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});


module.exports = app;
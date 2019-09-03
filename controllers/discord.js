const express = require('express');
const app = express();
const Discord = require('discord.js');

const website = "http://www.ArgentumOnline.org - AO Libre";
const iconFooter = "https://raw.githubusercontent.com/ao-libre/ao-website/master/assets/images/favicon.png";
const iconClassic = "https://cdn.discordapp.com/attachments/523242255230697490/612483417107595275/icon-256.png";

app.post("/sendConnectedMessage/", function (req, res) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    let username = req.body.userName
    let desc = req.body.desc

    // Pedidos es clan por que asi viene del charfile
    let clanName = req.body.pedidos

    if (desc === "") {
        desc = "El personaje no tiene descripcion, dentro del juego || Con el comando /desc podes cambiarla"
    }
    
    let description;
    if(clanName) {
        description = `${desc} -- Clan: ${clanName}`
    } else {
        description = desc
    }

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${username} se ha conectado al server de ROL Alkon 0.13.X`)
        // Set the color of the embed
        .setColor(0x36cd80)
        // Set the main content of the embed
        .setFooter(website, iconFooter)
        .setDescription(description);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendHappyHourStartMessage/", function (req, res) {
    let message = req.body.message

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Empezo el Happy Hour!!`)
        .setImage('https://i.pinimg.com/736x/cf/6a/06/cf6a0655a7d0697355648d556dbfc6f2.jpg')
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
        .setImage('http://londonfriend.org.uk/wp-content/uploads/2012/06/beer-glass.jpg')
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
        .setImage('http://londonfriend.org.uk/wp-content/uploads/2012/06/beer-glass.jpg')
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

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Un nuevo clan se ha formado en estas tierras (Alkon 0.13.X)`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-cliente/master/Graficos/Interfaces/VentanaFundarClan.jpg')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x9d01d4)
        // Set the main content of the embed
        .setDescription(message + " -- Manual para crear clanes: http://wiki.argentumonline.org/index0a56.html?seccion=clanes#ver");

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendWorldSaveMessage/", function (req, res) {
    let message = "Sabias que en http://wiki.argentumonline.org tenes la guia y en nuestro reddit guias de entrenamiento para cada raza?"

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Se inicio el World Save - Actualizacion de Rankings (Alkon 0.13.X)`)
        .setImage('http://2.bp.blogspot.com/-oblrxgI_1CI/TqBOybECgSI/AAAAAAAAACA/fEnWlv9GFBU/s728/save_the_world.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0xffffff)
        // Set the main content of the embed
        .setDescription(message);

    const channel = global.clientDiscord.channels.find(x => x.name === "general")
    channel.send(embed)
    return res.status(200).json(embed);
});

app.post("/sendCreatedNewCharacterMessage/", function (req, res) {
    let username = req.body.userName

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`${username} ha nacido en las tierras de Argentum (Alkon 0.13.X)`)
        .setImage('https://www.searchenginepeople.com/wp-content/uploads/2012/08/newbie.jpg')
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
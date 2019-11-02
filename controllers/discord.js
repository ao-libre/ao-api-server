const express = require('express');
const app = express();
const Discord = require('discord.js');
const { getOnlineUsersQuantityInServer } = require('../utils/server-configuration');

const website = "http://www.ArgentumOnline.org - AO Libre";
const iconFooter = "https://raw.githubusercontent.com/ao-libre/ao-website/master/assets/images/favicon.png";
const iconClassic = "https://cdn.discordapp.com/attachments/523242255230697490/612483417107595275/icon-256.png";

// Iniciamos el cliente de discord.js
let channelAOLibreDiscord
let channelArgentumComunidad
let channelChatFree
let channelSoloAos

const clientDiscord = new Discord.Client();
clientDiscord.on('ready', () => {
    // console.log(clientDiscord.channels.forEach(el => console.log(el.name)))
    channelAOLibreDiscord = clientDiscord.channels.find(x => x.name === "jugando")
    channelArgentumComunidad = clientDiscord.channels.find(x => x.name === "ao-libre")
    // channelChatFree = clientDiscord.channels.find(x => x.name === "aolibre")
    channelSoloAos = clientDiscord.channels.find(x => x.name === "ao-libre-bot")
    console.log(`Logged in Discord as ${clientDiscord.user.tag}!`);
});

clientDiscord.on('message', message => {
    message.content = message.content.toLowerCase()

    if (message.content === 'ping') {
        message.reply('pong');
    }  

    if (message.content.includes('gs zone') || message.content.includes('gs-zone') || message.content.includes('gs')) {
        const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`GS-Zone que bonito lugar`)
        .setImage(`https://www.gs-zone.org/styles/default/gszone/logo.png`)
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x90CC55)
        // Set the main content of the embed
        .setDescription(`Lleno de informacion para el Argentum https://www.gs-zone.org`);

        message.reply(embed)
    }  

    if (message.content.includes('barrin')) {
        const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x90CC55)
        // Set the main content of the embed
        .setDescription(`A ese Barrin yo no lo conozco, pero tampoco me cae bien, que libere el codigo!!!`);

        message.reply(embed)
    }  

    if (message.content.includes('aguante el ao')) {
        message.reply('Si bro, aguante el Argentum!!, bajalo de aca mono http://www.ArgentumOnline.org !!!')
    }  

    if (message.content === '/online') {
        const usersOnline = getOnlineUsersQuantityInServer()
        let imageNumber;

        if (usersOnline === 0) {
            imageNumber = 0
        } else {
            imageNumber = randomIntFromInterval(1, 12)
        }

        const embed = new Discord.RichEmbed()
            // Set the title of the field
            .setTitle(`Argentum Online Libre: Gente ONLINE en tiempo real`)
            .setImage(`https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/onlinerandom${imageNumber}.jpg`)
            .setFooter(website, iconFooter)
            // Set the color of the embed
            .setColor(0x90CC55)
            // Set the main content of the embed
            .setDescription(`En este momento hay: ${usersOnline} conectados en el servidor de Rol Alkon 0.13.X`);

        message.reply(embed)
    }

});

clientDiscord.login(process.env.DISCORD_TOKEN);

clientDiscord.on('error', err => {
    console.log('\x1b[35m%s\x1b[0m', err);
});

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
        clase = clase + randomIntFromInterval(0, 6);
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

    sendMessageToDiscordChannels(embed);
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

    sendMessageToDiscordChannels(embed);
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

    sendMessageToDiscordChannels(embed);
    return res.status(200).json(embed);
});

app.post("/sendHappyHourModifiedMessage/", function (req, res) {
    let message = req.body.message

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(`Seguimos en Happy Hour!`)
        .setImage('https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/happy-hour-modify-discord.png')
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0x641b06)
        // Set the main content of the embed
        .setDescription(message);

    sendMessageToDiscordChannels(embed);
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

    sendMessageToDiscordChannels(embed);
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

    sendMessageToDiscordChannels(embed);
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

    sendMessageToDiscordChannels(embed);
    return res.status(200).json(embed);
});

function sendMessageToDiscordChannels(message) {
    channelAOLibreDiscord.send(message)
    channelArgentumComunidad.send(message)
    channelChatFree.send(message)  
    channelSoloAos.send(message)  
}

module.exports = app;
const express = require('express');
const app = express();
const Discord = require('discord.js');
const { getOnlineUsersQuantityInServer } = require('../utils/server-configuration');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const website = "http://www.ArgentumOnline.org - AO Libre";
const iconFooter = "https://raw.githubusercontent.com/ao-libre/ao-website/master/assets/images/favicon.png";
const iconClassic = "https://cdn.discordapp.com/attachments/523242255230697490/612483417107595275/icon-256.png";

// Iniciamos el cliente de discord.js
let channelAOLibreDiscord
let channelArgentumComunidad
let channelSoloAos
let channelKeikah
let channelKeikahGeneral 
let channelLosPibesAoFrostGeneral 
let channelArgentumServersGeneral 
let channelArgentumComunidadGeneral
let channelGsZoneGeneral 
let channelAOLibreGeneralDiscord 

const clientDiscord = new Discord.Client();
clientDiscord.on('ready', () => {
    // console.log(clientDiscord.channels.filter(x => x.name.includes("general")))

    channelAOLibreDiscord = clientDiscord.channels.find(x => x.name === "jugando")
    channelArgentumComunidad = clientDiscord.channels.find(x => x.name === "ao-libre")
    channelSoloAos = clientDiscord.channels.find(x => x.name === "ao-libre-bot")


    //Estos son los grupos en el cual se envian el mensaje por medio del comando /discord
    //General kEiKAH
    channelKeikahGeneral = clientDiscord.channels.find(x => x.id === "620775992415223841")

    //General Los Pibes Ao Frost
    channelLosPibesAoFrostGeneral = clientDiscord.channels.find(x => x.id === "604839913585639436")
    
    //General Argentum Servers
    channelArgentumServersGeneral = clientDiscord.channels.find(x => x.id === "594281268620034059")

    //General Argentum Comunidad
    channelArgentumComunidadGeneral = clientDiscord.channels.find(x => x.id === "629842471232339979")

    //General GS-Zone
    channelGsZoneGeneral = clientDiscord.channels.find(x => x.id === "244710016290914306")

    //General AO-Libre
    channelAOLibreGeneralDiscord = clientDiscord.channels.find(x => x.id === "479056868707270659")


    console.log(`Logged in Discord as ${clientDiscord.user.tag}!`);
});

clientDiscord.on('message', message => {
    message.content = message.content.toLowerCase()

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


// Esto es para que no mande la notificacion del mismo usuario conectado al server en una hora
// Asi no spamea tanto
let usersConnectedLastHour = []
function cleanConnectedArray() {
    usersConnectedLastHour = [];
    return
}

app.post("/sendConnectedMessage/", function (req, res) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    let username = req.body.userName
    let desc = req.body.desc
    let esCriminal = req.body.esCriminal
    let clase = req.body.clase

    // // Si esto es verdadero retornamos para que no mande nada.
    // if (didUserConnectInTheLastHour(username)) {
    //     return res.status(204).send('No se envio el mensaje al chat de discord por que el usuario se conecto hace menos de 1 hora en multiples oportunidades');
    // }

    // usersConnectedLastHour.push(username)

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
    
    // // Si esto es verdadero retornamos para que no mande nada.
    // if (didUserConnectInTheLastHour(username)) {
    //     return res.status(204).send('No se envio el mensaje al chat de discord por que el usuario se conecto hace menos de 1 hora en multiples oportunidades');
    // }

    // usersConnectedLastHour.push(username)

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

app.post("/sendCustomCharacterMessageDiscord/", function (req, res) {
    let name = req.body.userName
    let desc = req.body.desc
    let chat = req.body.chat

    let title;
    if (desc === "") {
        title = `${name} ha enviado un mensaje desde dentro del server de AO-LIBRE (Alkon 0.13.X): `
    } else {
        title = `${name} (${desc}) ha enviado un mensaje desde dentro del server de AO-LIBRE (Alkon 0.13.X): `
    }

    const embed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle(title)
        .setFooter(website, iconFooter)
        // Set the color of the embed
        .setColor(0xFFF400)
        // Set the main content of the embed
        .setDescription(`${chat} || Podes enviar estos mensajes con el comando /discord en el juego`)

    sendMessageToDiscordGeneralChannels(embed);
    return res.status(200).json(embed);
});

function sendMessageToDiscordChannels(message) {
    channelAOLibreDiscord.send(message)
    channelArgentumComunidad.send(message)
    channelSoloAos.send(message)
}

function sendMessageToDiscordGeneralChannels(message) {
    channelKeikahGeneral.send(message) 
    channelLosPibesAoFrostGeneral.send(message) 
    channelArgentumServersGeneral.send(message) 
    channelArgentumComunidadGeneral.send(message)
    channelGsZoneGeneral.send(message) 
    channelAOLibreGeneralDiscord.send(message) 
}

module.exports = app;
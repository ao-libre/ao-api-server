const express = require('express');
const app = express();
const moment = require('moment');
const Discord = require('discord.js');
const { getOnlineUsersQuantityInServer } = require('../utils/server-configuration');
const zl = require("zip-lib");
const fetch = require('node-fetch');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const website = "http://www.ArgentumOnline.org - AO Libre";
const iconFooter = "https://raw.githubusercontent.com/ao-libre/ao-website/master/assets/images/favicon.png";
const iconClassic = "https://cdn.discordapp.com/attachments/523242255230697490/612483417107595275/icon-256.png";

// Iniciamos el cliente de discord.js
let channelAOLibreJugandoChannelDiscord
let channelSoloAos
let channelLosPibesAoFrostGeneral 
let channelArgentumServersGeneral 
let channelAOLibreGeneralDiscord 

const clientDiscord = new Discord.Client();
clientDiscord.on('ready', () => {

    // Estos son simplemente el log del server/conectados online/happy hour/worldsave/etc
    channelAOLibreJugandoChannelDiscord = clientDiscord.channels.find(x => x.id === "479059822545993740")
    channelSoloAos = clientDiscord.channels.find(x => x.name === "ao-libre-bot")

    //Estos son los grupos en el cual se envian el mensaje por medio del comando /discord
    //General Los Pibes Ao Frost
    channelLosPibesAoFrostGeneral = clientDiscord.channels.find(x => x.id === "604839913585639436")
    
    //General Argentum Servers
    channelArgentumServersGeneral = clientDiscord.channels.find(x => x.id === "594281268620034059")

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

    if (message.content === '/descargar') {
        const embed = new Discord.RichEmbed()
            // Set the title of the field
            .setTitle('Argentum Online Libre - AO Clasico')
            .setFooter(website, iconClassic)
            // Set the color of the embed
            .setColor(0x00ff00)
            // Set the main content of the embed
            .setDescription(`Entra aca para bajarte el juego http://www.ArgentumOnline.org/aoclasico.html`)
        
        // channelAOLibreGeneralDiscord.send(embed)
        message.reply(embed)
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
            .setTitle(`Argentum Online Libre: Gente en todos los servidores`)
            .setThumbnail('http://argentumonline.org/assets/images/ao-libre-logo.png')
            .setImage(`https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/onlinerandom${imageNumber}.jpg`)
            .setFooter(website, iconClassic)
            // Set the color of the embed
            .setColor(0x90CC55)
            // Set the main content of the embed
            .setDescription(`Cantidad de gente jugando en cada uno de los servidores online de AO Libre`)
            .addField(`Servidor Primario v0.13.X Alkon`, `Cantidad Online en Tiempo Real: ${usersOnline}.`)
            .addField('\u200B', '\u200B')
            
        var dateNow = new Date();
        
        fetch('http://api.argentumonline.org/api/v1/servers/getOnlineUsersFromAllServers')
        .then(res => res.json())
        .then(data => {
            data.forEach(server => {
                
                var now = new Date();
                var serverLastUpdate = new Date(server.dateTime);
                var diffMs = (serverLastUpdate - now); // milliseconds between now & Christmas
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                if (diffMins <= 2) { 
                    embed.addField(`${server.serverName} | ${server.ipAndPort} `, `Online: ${server.quantityUsers} - Actualizado ${moment(server.dateTime).format("DD-MM hh:mm a")}.`, true);
                    embed.addField('\u200B', '\u200B')
                } else {
                    delete server
                }
            })

            message.reply(embed)
        });
    }

    if (message.content === '/comics') {
        let imageNumber = randomIntFromInterval(1, 222)

        const embed = new Discord.RichEmbed()
            // Set the title of the field
            .setTitle(`Argentum Online Libre presenta: Comics de MegaDimension`)
            .setAuthor('MegaDimension', 'https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/comics/logo-megadimension.png', 'http://www.megadimension.com.ar/')
            .setImage(`https://raw.githubusercontent.com/ao-libre/ao-api-server/master/resources/images/comics/Comic${imageNumber}.png`)
            .setFooter(website, iconFooter)
            // Set the color of the embed
            .setColor(0xf7f7f7)
            // Set the main content of the embed
            .setDescription(`Encontra mas comics del autor en su web: http://www.megadimension.com.ar/`)
            .addField('AO Libre Server Primario Online 24/7', 'http://www.ArgentumOnline.org', true);

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

    sendMessageToDiscordGeneralChannels(embed);
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

    sendMessageToDiscordGeneralChannels(embed);
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

    sendMessageToDiscordGeneralChannels(embed);
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
    // creamos backup de algunas carpetas 
    const zip = new zl.Zip();

    const date = new Date();
    let isoDateString = date.toISOString();
    console.log(isoDateString)
    isoDateString = isoDateString.replace(/:/g,"-");
    console.log(isoDateString)

    // Adds a folder from the file system, putting its contents at the root of archive
    zip.addFolder("./server/Account", "Account");
    zip.addFolder("./server/Charfile", "Charfile");
    zip.addFolder("./server/Guilds", "Guilds");
    // Generate zip file.
    zip.archive(`./backups/aolibre-${isoDateString}.zip`).then(function () {
        console.log("Backup de los Guilds, Account, Charfile hecho");
    }, function (err) {
        console.log(err);
    });
    
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
    channelAOLibreJugandoChannelDiscord.send(message)
    channelSoloAos.send(message)
}

function sendMessageToDiscordGeneralChannels(message) {
    channelAOLibreGeneralDiscord.send(message) 
    channelLosPibesAoFrostGeneral.send(message) 
    channelArgentumServersGeneral.send(message) 
}

module.exports = app;
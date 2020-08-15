const fs = require('fs');
const ip = require("ip");
const nodemailer = require('nodemailer'); 
const { encriptPassword, getSaltFromAccount } = require("./account");

const htmlTemplateEmail = fs.readFileSync('./resources/emails/template.html', 'utf-8')

// mas info: https://nodemailer.com/smtp/pooled/
// create reusable transporter object using the default SMTP transport
const transporterLogin = nodemailer.createTransport({
    pool: true,
    maxMessages: 50,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
})

// create reusable transporter object using the default SMTP transport
const transporterRecuperarPassword = nodemailer.createTransport({
    pool: true,
    maxMessages: 50,
    host: process.env.EMAIL_HOST_RECUPERAR_PASSWORD,
    port: process.env.EMAIL_PORT_RECUPERAR_PASSWORD,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER_RECUPERAR_PASSWORD,
      pass: process.env.EMAIL_PASSWORD_RECUPERAR_PASSWORD,
    }
})

// create reusable transporter object using the default SMTP transport
const transporterBienvenida = nodemailer.createTransport({
    pool: true,
    maxMessages: 50,
    host: process.env.EMAIL_HOST_BIENVENIDA,
    port: process.env.EMAIL_PORT_BIENVENIDA,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER_BIENVENIDA,
      pass: process.env.EMAIL_PASSWORD_BIENVENIDA,
    }
})

// create reusable transporter object using the default SMTP transport
const transporterNewsletter = nodemailer.createTransport({
    pool: true,
    maxMessages: 50,
    host: process.env.EMAIL_HOST_NEWSLETTER,
    port: process.env.EMAIL_PORT_NEWSLETTER,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER_NEWSLETTER,
      pass: process.env.EMAIL_PASSWORD_NEWSLETTER,
    }
})

let messagesLogin = [];
let messagesNewsletter = [];
let messagesBienvenida = [];
let messagesRecuperarPassword = [];
let blacklistEmails = {};

transporterLogin.on("idle", function () {
    // send next message from the pending queue
    setInterval(() => {
        while (transporterLogin.isIdle() && messagesLogin.length) {
            let lastMessage =  messagesNewsletter.shift();

            transporterLogin.sendMail(messagesLogin.shift(), function(error, info){
                if (error) {
                    console.error('\x1b[31m%s\x1b[0m', "ERROR - transporterLogin error: " + error)
                    console.error('No se pudo enviar el email de login: ' + error)
                } else {
                    putEmailInBlackList(error);
                    console.info("Se envio un email de login a: " + emailTo)
                    console.info('Email login sent: ' + lastMessage.to)
                }
            }); 
        }
    }, 3000)

});

transporterNewsletter.on("idle", function () {
    // send next message from the pending queue
    setInterval(() => {
        console.log('MessagesNewsletter en cola: ' + messagesNewsletter.length)
        while (transporterNewsletter.isIdle() && messagesNewsletter.length) {
            let lastMessage =  messagesNewsletter.shift();
            console.log('MessagesNewsletter en cola syhift: ' + messagesNewsletter.length)

            transporterNewsletter.sendMail(lastMessage, function(error, info){
                if (info && info.response.includes("250")) {
                    console.info("Se envio un email de newsletter a: " + lastMessage.to)
                } else {
                    putEmailInBlackList(error);

                    // Si falla re-encolamos el mensaje
                    messagesNewsletter.push(lastMessage);
                    console.info('MessagesNewsletter en cola p[yusg]: ' + messagesNewsletter.length)

                    console.error('\x1b[31m%s\x1b[0m', "ERROR - transporterNewsletter error: " + error)
                }
            }); 
        }
    }, 30000)
});

transporterBienvenida.on("idle", function () {
    // send next message from the pending queue
    setInterval(() => {
        while (transporterBienvenida.isIdle() && messagesBienvenida.length) {
            let lastMessage =  messagesBienvenida.shift();
            
            transporterBienvenida.sendMail(messagesBienvenida.shift(), function(error, info){
                if (error) {
                    console.error('\x1b[31m%s\x1b[0m', "ERROR - transporterBienvenida error: " + error)
                    console.error('No se pudo enviar el email de bienvenida: ' + error)
                } else {
                    putEmailInBlackList(error);
                    console.info("Se envio un email de bienvenida a: " + lastMessage.to)
                    console.info('Email bienvenida sent: ' + info.response)
                }
            }); 
        }
    }, 30000)
});
  
transporterRecuperarPassword.on("idle", function () {
    setInterval(() => {
        // send next message from the pending queue
        while (transporterRecuperarPassword.isIdle() && messagesRecuperarPassword.length) {
            let lastMessage = messagesRecuperarPassword.shift();

            transporterRecuperarPassword.sendMail(lastMessage, function(error, info){
                if (error) {
                    console.error('\x1b[31m%s\x1b[0m', "ERROR - transporterRecuperarPassword error: " + error)
                    console.error('No se pudo enviar el email de recuperar password: ' + error)
                } else {
                    putEmailInBlackList(error);
                    console.info("Se envio un email de recuperar password a: " + lastMessage.to)
                    console.info('Email recuperar password sent: ' + info.response)
                }
            }); 
        }
    }, 30000)
});

function putEmailInBlackList (error) {
    if (!error.contains("450")) {
        //Metemos el email en el blacklist si NO es error 450 que es exceeded message rate
        blacklistEmails.push(lastMessage.to)
        blacklistEmails = [...new Set(blacklistEmails)]; 
        console.info("Guardando emails que no se pueden enviar en blacklist-emails.json");
        fs.writeFileSync(`./blacklist-emails.json`, JSON.stringify(blacklistEmails, null, 4));
    }
}

exports.sendWelcomeEmail = function (req, res, emailTo, username, password) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/welcome.html', 'utf-8')
    htmlContentEmail = htmlContentEmail.replace('VAR_USERNAME', username)
    htmlContentEmail = htmlContentEmail.replace('VAR_PASSWORD', password)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    var mailOptions = {
        from: process.env.EMAIL_BIENVENIDA,
        to: emailTo,
        subject: '🗡 Bienvenido a Argentum Online Libre (Alkon) ⚔️',
        html: htmlContentEmail
    };

    messagesBienvenida.push(mailOptions);
    return res.status(200).send('Email Bienvenida en espera para: ' + emailTo)
};

exports.sendLoginEmail = function (req, res, emailTo, date, currentIp) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/loginAccount.html', 'utf-8')
    
    htmlContentEmail = htmlContentEmail.replace('VAR_IP', currentIp)

    var yyyymmdd = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " ";
    const hourAndMinutes = (date.getHours()<10?'0':'') + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()

    const formattedDate = yyyymmdd + hourAndMinutes

    htmlContentEmail = htmlContentEmail.replace('VAR_DATE', formattedDate)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    var mailOptions = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: '🛡 Nuevo inicio de sesión en Argentum Online Libre',
        html: htmlContentEmail
    };

    messagesLogin.push(mailOptions);
    return res.status(200).send('Email Login en espera para: ' + emailTo)
};

exports.sendResetAccountPassword = async function (req, res, email, password) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/resetPassword.html', 'utf-8')
    
    //Obtenemos la salt del personaje, encriptamos la password y mandamos el email
    const salt = getSaltFromAccount(email)
    const encriptedPassword = await encriptPassword(password, salt);

    // Hardcodeo la ip por que amazon no funciona bien con esto, asi que hasta que cambiemos de host arreglo esto.
	// const linkResetPasswordEndpoint = `http://${ip.address()}:1337/api/v1/accounts/resetPassword/${email}/${encriptedPassword}`
	const linkResetPasswordEndpoint = `http://18.230.151.33:1337/api/v1/accounts/resetPassword/${email}/${encriptedPassword}`

    htmlContentEmail = htmlContentEmail.replace('VAR_LINK_ENDPOINT_RESET_PASSWORD', linkResetPasswordEndpoint)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    var mailOptions = {
        from: process.env.EMAIL_RECUPERAR_PASSWORD,
        to: email,
        subject: '🔑 Reset Password Cuenta Argentum Online Libre (Alkon) 🔐',
        html: htmlContentEmail
    };

    messagesRecuperarPassword.push(mailOptions);
    return res.status(200).send('Email Recuperar Password en espera para: ' + email)
};

exports.sendNewsletterEmail = async function (req, res, allEmails, emailSubject, emailContent) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/newsletter.html', 'utf-8')

    htmlContentEmail = htmlContentEmail.replace('VAR_CONTENT', emailContent)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    blacklistEmails = fs.readFileSync('./blacklist-emails.json', 'utf-8')
    blacklistEmails = JSON.parse(blacklistEmails);

    console.log(`Hay que enviar ${allEmails.length} emails`)

    let mailOptions = {
        from: process.env.EMAIL_NEWSLETTER,
        subject: `⛏ ${emailSubject}`,
        html: htmlContentEmail
    };

    for (const [key, emailValue] of Object.entries(allEmails)) {
        // Si NO esta email esta en la blacklist trabajamos.
        if (!blacklistEmails.includes(emailValue.INIT_USERNAME)) {
            mailOptions.to = "lucas.recoaro@gmail.com";

            messagesNewsletter.push(mailOptions);
            console.info('Email Newsletter en espera para: ' + mailOptions.to)
        }
    };
    
    return res.status(200).send("Se inicio el envio del newsletter email con exito")
};
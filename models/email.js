const fs = require('fs');
const ip = require("ip");
const nodemailer = require('nodemailer'); 
const { encriptPassword, getSaltFromAccount } = require("./account");

const htmlTemplateEmail = fs.readFileSync('./resources/emails/template.html', 'utf-8')

let blacklistEmails = fs.readFileSync('./blacklist-emails.json', 'utf-8')
blacklistEmails = JSON.parse(blacklistEmails);

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

transporterLogin.on("idle", function () {
    // send next message from the pending queue
    setInterval(() => {
        console.log('messagesLogin en cola: ' + messagesLogin.length)
        
        while (transporterLogin.isIdle() && messagesLogin.length) {
            let lastMessage =  messagesLogin.shift();

            transporterLogin.sendMail(lastMessage, function(error, info){
                if (error) {
                    putEmailInBlackListOrAddInArrayToRetry(error, messagesLogin, lastMessage);
                    console.error('\x1b[31m%s\x1b[0m', `ERROR ${lastMessage.to} - transporterLogin error: ${error}`)
                } else {
                    console.info("Se envio un email de login a: " + emailTo)
                }
            }); 
        }
    }, 3000)

});

transporterNewsletter.on("idle", function () {
    // send next message from the pending queue
    setInterval(() => {
        console.log('messagesNewsletter en cola: ' + messagesNewsletter.length)

        while (transporterNewsletter.isIdle() && messagesNewsletter.length) {

            let lastMessage =  messagesNewsletter.shift();

            transporterNewsletter.sendMail(lastMessage, function(error, info){
                if (error) {
                    putEmailInBlackListOrAddInArrayToRetry(error, messagesNewsletter, lastMessage);
                    console.error('\x1b[31m%s\x1b[0m', `ERROR ${lastMessage.to} - transporterNewsletter error: ${error}`)
                } else {
                    console.info("Se envio un email de newsletter a: " + lastMessage.to)
                }
            }); 
        }
    }, 60000)
});

transporterBienvenida.on("idle", function () {
    // send next message from the pending queue
    setInterval(() => {
        console.log('messagesBienvenida en cola: ' + messagesBienvenida.length)
       
        while (transporterBienvenida.isIdle() && messagesBienvenida.length) {
            let lastMessage =  messagesBienvenida.shift();
            
            transporterBienvenida.sendMail(lastMessage, function(error, info){
                if (error) {
                    putEmailInBlackListOrAddInArrayToRetry(error, messagesBienvenida, lastMessage);
                    console.error('\x1b[31m%s\x1b[0m', `ERROR ${lastMessage.to} - transporterBienvenida error: ${error}`)
                } else {
                    console.info("Se envio un email de bienvenida a: " + lastMessage.to)
                }
            }); 
        }
    }, 60000)
});
  
transporterRecuperarPassword.on("idle", function () {
    setInterval(() => {
        console.log('messagesRecuperarPassword en cola: ' + messagesRecuperarPassword.length)
        
        // send next message from the pending queue
        while (transporterRecuperarPassword.isIdle() && messagesRecuperarPassword.length) {
            let lastMessage = messagesRecuperarPassword.shift();

            transporterRecuperarPassword.sendMail(lastMessage, function(error, info){
                if (error) {
                    putEmailInBlackListOrAddInArrayToRetry(error, messagesRecuperarPassword, lastMessage);
                    console.error('\x1b[31m%s\x1b[0m', `ERROR ${lastMessage.to} - transporterRecuperarPassword error: ${error}`)
                } else {
                    console.info("Se envio un email de recuperar password a: " + lastMessage.to)
                }
            }); 
        }
    }, 60000)
});

function putEmailInBlackListOrAddInArrayToRetry (error, arrayMessages, message) {
    console.log("putEmailInBlackListOrAddInArrayToRetry: ", error.response)
    console.log("putEmailInBlackListOrAddInArrayToRetry: ", message.to)

    //Si no es error de que excedimos quota de mensajes permitidos le re-encolamos.
    if (error.response && !error.response.includes("End-of-data rejected: exceeded message rate")) {
        blacklistEmails.push(message.to)
        blacklistEmails = [...new Set(blacklistEmails)]; 
        console.info(message.to + " guardando en blacklist-emails.json");
        fs.writeFileSync(`./blacklist-emails.json`, JSON.stringify(blacklistEmails, null, 4));
    } else {
        console.info("re-encolando email: " + message.to);
        arrayMessages.push(message)
    }

    return
}

exports.sendWelcomeEmail = function (req, res, emailTo, username, password) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/welcome.html', 'utf-8')
    htmlContentEmail = htmlContentEmail.replace('VAR_USERNAME', username)
    htmlContentEmail = htmlContentEmail.replace('VAR_PASSWORD', password)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    let mailOptions = {
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

    let yyyymmdd = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " ";
    const hourAndMinutes = (date.getHours()<10?'0':'') + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()

    const formattedDate = yyyymmdd + hourAndMinutes

    htmlContentEmail = htmlContentEmail.replace('VAR_DATE', formattedDate)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    let mailOptions = {
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
	const linkResetPasswordEndpoint = `http://${ip.address()}:1337/api/v1/accounts/resetPassword/${email}/${encriptedPassword}`

    htmlContentEmail = htmlContentEmail.replace('VAR_LINK_ENDPOINT_RESET_PASSWORD', linkResetPasswordEndpoint)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    let mailOptions = {
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

    console.log(`Hay que enviar ${allEmails.length} emails`)

    for (const [key, emailValue] of Object.entries(allEmails)) {

        // Si NO esta email esta en la blacklist trabajamos.
        if (!blacklistEmails.includes(emailValue.INIT_USERNAME)) {
            let mailOptions = {
                from: process.env.EMAIL_NEWSLETTER,
                subject: `⛏ ${emailSubject}`,
                html: htmlContentEmail,
                to: emailValue.INIT_USERNAME
            };

            messagesNewsletter.push(mailOptions);
            console.info('Email Newsletter en espera para: ' + mailOptions.to)
        }

    };
    
    return res.status(200).send("Se inicio el envio del newsletter email con exito")
};
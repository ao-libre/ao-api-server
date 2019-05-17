const nodemailer = require('nodemailer');
const fs = require('fs');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
})
const htmlTemplateEmail = fs.readFileSync('./resources/emails/template.html', 'utf-8')

exports.sendWelcomeEmail = function (req, res, emailTo, username, password) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/welcome.html', 'utf-8')
    htmlContentEmail = htmlContentEmail.replace('VAR_USERNAME', username)
    htmlContentEmail = htmlContentEmail.replace('VAR_PASSWORD', password)

    //Despues obtenemos el archivo html del template y reemplazamos la variable por el contenido deseado
    htmlContentEmail = htmlTemplateEmail.replace('VAR_TIPO_EMAIL_ENVIAR', htmlContentEmail)

    var mailOptions = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: '🗡 Bienvenido a Argentum Online Libre (Alkon 0.13) ⚔️',
        html: htmlContentEmail
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send('No se pudo enviar el email de bienvenida' + error)
        } else {
            console.info("Se envio un email de bienvenida a: " + emailTo)
            res.status(200).json('Email welcome sent: ' + info.response)
        }
    }); 
};

exports.sendLoginEmail = function (req, res, emailTo, date) {
    //Primero obtenemos el archivo html del tipo de email a enviar y ponemos los parametros
    let htmlContentEmail = fs.readFileSync('./resources/emails/loginAccount.html', 'utf-8')
    
    //TODO: MANDAR IP??
    htmlContentEmail = htmlContentEmail.replace('VAR_IP', '')

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
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send('No se pudo enviar el email de login' + error)
        } else {
            console.info("Se envio un email de login a: " + emailTo)
            res.status(200).json('Email login sent: ' + info.response)
        }
    }); 
};
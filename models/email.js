const nodemailer = require('nodemailer');
const fs = require('fs');
const ip = require("ip");
const { encriptPassword, getSaltFromAccount } = require("./account")

const htmlTemplateEmail = fs.readFileSync('./resources/emails/template.html', 'utf-8')

// mas info: https://nodemailer.com/smtp/pooled/
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
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
    
    transporterBienvenida.sendMail(mailOptions, function(error, info){
        if (error) {
			console.error('\x1b[31m%s\x1b[0m', "ERROR - sendWelcomeEmail error: " + error)
            return res.status(500).send('No se pudo enviar el email de bienvenida' + error)
        } else {
            console.info("Se envio un email de bienvenida a: " + emailTo)
            return res.status(200).send('Email welcome sent: ' + info.response)
        }
    }); 
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
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
			console.error('\x1b[31m%s\x1b[0m', "ERROR - sendLoginEmail error: " + error)
            return res.status(500).send('No se pudo enviar el email de login' + error)
        } else {
            console.info("Se envio un email de login a: " + emailTo)
            return res.status(200).send('Email login sent: ' + info.response)
        }
    }); 
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
    
    transporterRecuperarPassword.sendMail(mailOptions, function(error, info){
        if (error) {
			console.error('\x1b[31m%s\x1b[0m', "ERROR - sendResetAccountPassword error: " + error)
            return res.status(500).send({error: 'No se pudo enviar el email de reset password'})
        } else {
            console.info("Se envio un email de reset password a: " + email)
			return res.status(200).send('Email reset password sent: ' + info.response)
        }
    }); 
};

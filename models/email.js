const nodemailer = require('nodemailer');

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

exports.sendWelcomeEmail = function (req, res, emailTo) {
    var mailOptions = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: 'Bienvenido a Argentum Online',
        text: 'Se viene los emails loquito :):):)!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send('No se pudo enviar el email ' + error)
        } else {
            res.status(200).json('Email sent: ' + info.response)
        }
    }); 
};
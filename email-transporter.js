const nodemailer = require('nodemailer');

exports.createTransporter= function(callback) {
    // create reusable transporter object using the default SMTP transport
    poolNewsletterEmail = nodemailer.createTransport({
        pool: true,
        logger: true,
        secure: true, // use SSL
        rateDelta: 86400000, //24 Hours
        rateLimit: 50, 
        host: process.env.EMAIL_HOST_NEWSLETTER,
        port: process.env.EMAIL_PORT_NEWSLETTER,
        auth: {
            user: process.env.EMAIL_USER_NEWSLETTER,
            pass: process.env.EMAIL_PASSWORD_NEWSLETTER,
        },
    });

    // create reusable transporter object using the default SMTP transport
    poolGeneralEmail = nodemailer.createTransport({
        pool: true,
        logger: true,
        secure: true, // use SSL
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    callback()
};

exports.getNewsletterPool = function() {
    return poolNewsletterEmail;
};

exports.getGeneralPool = function() {
    return poolGeneralEmail;
};
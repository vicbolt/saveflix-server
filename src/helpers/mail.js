const nodemailer = require('nodemailer')

const config = require('../config')


async function send(email, content, subject){
    try{

        const transporter = nodemailer.createTransport(config.mail);

        await transporter.sendMail({
            from: "SaveFlix@media.com",
            to: email,
            subject,
            html: content,
        });

    }catch(error){
        throw error
    }
}


module.exports = {
    send,
}
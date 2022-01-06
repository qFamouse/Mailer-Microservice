const nodemailer = require('nodemailer');
const config = require('./../config/appsettings.json').Transporter;

class Mailer {
    // Private Fields //
    #transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: true,
        auth: {
            user: config.auth.user,
            pass: config.auth.pass
        }
    });
    // Constructor - Verification SMTP Configuration //
    constructor() {
        this.#transporter.verify((error, success) => {
            if (error) { throw new Error(error) }
            else { console.log('Server is ready to take our messages'); }
        })
    }
    // Public Methods //
    async SendMail(subject, text, html, ...to) {
        await this.#transporter.sendMail({
            from: config.email,
            to: to,
            subject: subject,
            text: text,
            html: html
        })
    };
}

module.exports = new Mailer();
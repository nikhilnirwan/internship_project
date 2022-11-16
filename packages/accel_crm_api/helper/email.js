var nodemailer = require('nodemailer');
const config = require("../config.json")

module.exports = {
    sendMail: (to, subject, body, cc = []) => {
        var transporter = nodemailer.createTransport({
            service: config.auth.service,
            port: config.auth.port,
            tls: true,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass
            }
        })

        var mailOptions = {
            from: config.auth.user,
            to: to,
            cc: cc,
            bcc: config.bcc,
            subject: subject,
            html: body
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("Mail Sent", info.response)
            }
        })
    },
    testMail: (to, subject, body) => {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: config.auth.service,
                port: config.auth.port,
                tls: true,
                auth: {
                    user: config.auth.user,
                    pass: config.auth.pass
                }
            })

            var mailOptions = {
                from: config.auth.user,
                to: to,
                subject: subject,
                html: body
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    resolve(JSON.stringify(error))
                } else {
                    console.log("Mail Sent", info.response)
                    resolve(JSON.stringify(info.response))
                }
            })
        })
    },
};

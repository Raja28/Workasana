const nodemailer = require("nodemailer")
require("dotenv").config()

exports.otpMailSender = async (email, otp) => {
    try {
        const transpotor = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })

        const mailResponse = await transpotor.sendMail({
            from: `Workasana 👻"<noreply-workasana.com>`,
            to: `${email}`,
            subject: "Email Verification", 
            html: `Workasna verification OTP: ${otp} valid for 5mins`, 
        })

    } catch (error) {
        throw error
    }
}
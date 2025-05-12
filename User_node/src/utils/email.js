const transporter = require("../Config/EmailConfig")
require('dotenv').config()

const SendEmail = async (reciever,subject,msg)=>{
    const EmailOptions ={
        from:process.env.EMAIL_USER,
        to:reciever,
        subject:subject,
        html: msg,
    }
    await transporter.sendMail(EmailOptions)
}

const genOTP = ()=>{
    const size = 4;
    let OPT = ""
    for (let i = 1; i <= size; i++) {
        OPT += Math.floor(Math.random() * 10)
    }
    return OPT
}
module.exports = {genOTP,SendEmail}

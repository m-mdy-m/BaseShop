const nodemailer = require("nodemailer");
let transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7d555598001454",
    pass: "745c69e3e0c996",
  },
});
const sendEmail = (email,token)=>{
    transport.sendMail({
        from : "mahdimamashli1383@gmail.com",
        to : email,
        subject : "RESET PASSWORD",
        html : `<a href=http://localhost:3000/reset/${token}>LINK</a>`
    })
}
module.exports = sendEmail
const nodeMailer = require("nodemailer");

sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        server:process.env.SMPT_SERVICE,
        auth:{
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
      }
    })

    const mailOptions ={
        from:process.env.SMPT_MAIL,
        to: user.email,
        subject:`Ecommerce Passsword recovery`,
        text:message,
    }

       transporter.sendMail(mailOptions,(err) => {
        if (err){
            res.json('Opps error occured')
        } else{
            res.json('thanks for e-mailing me');
        }
    });

}

exports.module = sendEmail;
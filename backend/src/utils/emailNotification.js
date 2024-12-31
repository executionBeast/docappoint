import dotenv from "dotenv";
dotenv.config({
    path:'../../.env',
})

import nodemailer from "nodemailer";
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
console.log(NODEMAILER_PASS, NODEMAILER_USER)

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS   
    }
});
const sendEmailNotification = async (to, message)=>{
    try{
        const mail = await transporter.sendMail(
            {
                from:'Docappoint <raos92249@gmail.com>',
                to:`${to}`,
                subject:'Docappoint OTP',
                html:message,
            }
        );
        console.log(`Email Sent: `, mail);
    }
    catch(error){
        console.log("EmailError: ",error);
    }
}
// let to = 'ashokag67570@gmail.com'
// let message =`Docappoint | Your One Time OTP is ${222222}`
// sendEmailNotification(to,message);

export default sendEmailNotification;

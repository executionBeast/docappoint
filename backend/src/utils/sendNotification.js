import dotenv from 'dotenv';
dotenv.config({ path: '.env' });    

import twilio from 'twilio';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const sendNotification = async (message, to) => {
    client.messages
        .create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: to,
        })
        .then(message => console.log("NOTIFICATION SENT ",message));
}
export default sendNotification;
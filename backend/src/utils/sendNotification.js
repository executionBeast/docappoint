import dotenv from 'dotenv';
dotenv.config({ path: '.env' });    

import twilio from 'twilio';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_MESSAGE_SERVICE_SID = process.env.TWILIO_MESSAGE_SERVICE_SID
console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendNotification = async (to, message) => {
    client.messages
        .create({
            body: message,
            messagingServiceSid: 'MGeae5277bc3c2b32cabed165684a33a10',
            to:`+91${to}`,
        })
        .then(message => console.log("NOTIFICATION SENT ",message));
}
export default sendNotification;
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });    

import twilio from 'twilio';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
client.messages
       .create({
        body:`OPT to verify docappoint account ${Math.random(1000,99999)}`,
        from:TWILIO_PHONE_NUMBER,
        to:"+917052070747",
       })
         .then(message => console.log(message));

// client.verify.v2.services("VAc755d3ed0cfddec79f7bc742d0061c6e")
//     .verifications
//     .create({to: '+917052070747', channel: 'sms'})
//     .then(verification=> console.log(verification));


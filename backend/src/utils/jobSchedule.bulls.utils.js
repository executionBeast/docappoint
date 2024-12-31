//Objective
//1. setAppointmentMissed requires appointmentId, PatientId, Date, Time it is scheduled
//2. Add +15 minutes from the scheduled as {delay: 'delayedTime}   

import bullQueue from 'bull';
import Appointment from '../models/appointment.models.js';
import Patient from '../models/patient.models.js';

// const rescheduleAppointmentQueue = new bullQueue("rescheduleAppointment");

const sendDelayedNotification = (appointmentId, patientId, delayedTimeStamp)=>{
    const sendNotificationQueue = new bullQueue("sendNotification");

    //producer
    const sendNotificationJob = sendNotificationQueue.add(
        {
            appointmentId:appointmentId,
            patientId:patientId,
         },
         { 
            delay: delayedTimeStamp,
         })
    //consumer
    console.log("-----------------------Console before job process---------------------- ")
    sendNotificationQueue.process(async (jobPayload)=>{
        const appointment = Appointment.findByIdAndUpdate(jobPayload.data.appointmentId,{
            status:"Missed"
        });
        const patient = Patient.findById(jobPayload.data.patientId);
        if(appointment && patient){
            console.log(`Appointment of ${JSON.stringify(patient)} marked to missed --> ${JSON.stringify(appointment)} `);
        }
        
    })

}
export default sendDelayedNotification;

// const setAppointmentMissed = (appointmentId, patientId)=>{
//     try{
//         const 
//     }
//     catch(error){

//     }
// }
//producer
// const sendNotificationJob = await sendNotificationQueue.add({ foo: 'bar' }, { delay: 5000 });

//consumer
// sendNotificationQueue.process(async (job)=>{
//     console.log("Hello")
// })
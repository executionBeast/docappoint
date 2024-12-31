import { Queue, Worker } from "bullmq";  //bullMQ

import Appointment from "../models/appointment.models.js"; //Appointment
import Patient from "../models/patient.models.js";    //Patient

import sendNotification from "./sendNotification.js"   //sendNotification
import { timestampToHumanDate } from "./date.utils.js";     //timestampToHumanDate

const alterAppointmentStatusQueue = new Queue("alter-appointment-status-queue", {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
})

const alterAppointmentStatusWorker = new Worker(
    "alter-appointment-status-queue",
     async (job) => {
        console.log(`Executing Job... ${job.id}`)
        console.log(`Job Metadata... ${JSON.stringify(job.data)}`)

        const { appointmentId, patientId, scheduledTimestamp } = job.data;

        const appointment = await Appointment.findById(appointmentId);
        const patient = await Patient.findById(patientId);
        
        if (appointment.status === 'Booked' && patient) {
            console.log("------Appointment Found To Be Booked Even After CheckedIn Time------")
            const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
                status: "Missed"
            },{
                new:true,
            });
            let message = `You have missed an appointment dated (${timestampToHumanDate(appointment.scheduledTimestamp)}), kindly reschedule`
            await sendNotification(patient.phone, message)
        
        } else {
            console.log("=======Patient Checked In On Time, No Change======");
        }

        console.log("Appointment Checked : ", appointment);


    }, { connection: { host: '127.0.0.1', port: '6379' } });

const checkAndMarkMissedAppointment = async (appointmentId, patientId, scheduledTimestamp) => {
    console.log(`Job Added To Queue, Appointment: "${appointmentId}", Patient: "${patientId}", Schedule: "${scheduledTimestamp}"`)
    
    const currentTimestamp = Date.now();
    let delay = scheduledTimestamp - currentTimestamp + 2 * 60 * 1000;  //
    console.log("JOB DELAY : ", delay);
    
    await alterAppointmentStatusQueue.add(`Job added appointmentID: "${appointmentId}"`, {
        appointmentId: appointmentId,
        patientId: patientId,
        scheduledTimestamp
    }, {
        delay
    })
    console.log(`Job Queue Added to Check & Alter Appointment Status of 
        appointmentID : "${appointmentId}",
        patientID: "${patientId}",
        Schedule: "${ timestampToHumanDate(scheduledTimestamp) }" `)
}

export default checkAndMarkMissedAppointment;
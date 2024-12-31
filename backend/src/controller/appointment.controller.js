import Appointment from "../models/appointment.models.js";
import Doctor from "../models/doctor.models.js";
import Patient from "../models/patient.models.js";
import checkAndMarkMissedAppointment from "../utils/checkMissedAppointment.js";
import sendNotification from "../utils/sendNotification.js";
import { humanDateToTimestamp, timestampToHumanDate } from "../utils/date.utils.js";


export const getAppointments = async (req,res)=>{
    res.send("GET APPOINTMENTS");

}

export const createAppointment = async (req, res) =>{
    try{

        const {doctorId, patientId, status, scheduledTimestamp} = req.body;
        console.log("Scheduled Timestamp -->",scheduledTimestamp, "Schedule Human Date-->", timestampToHumanDate(scheduledTimestamp));
        
        if(!doctorId || !patientId || !status || !scheduledTimestamp){
            console.log("Form Data, DoctorId, patientId, status", doctorId, patientId, status);
            return res.status(400).json({error:"All fields are required"});
        };

        const appointment = new Appointment({
            doctorId,
            patientId,
            scheduledTimestamp,
            status,
        });
        await appointment.save();
        if(appointment){
            // const doctor = await Doctor.findById(appointment.doctorId);
            // const patient = await Patient.findById(appointment.patientId);
            
            // await sendNotification(patient.phone, `Your appointment with Dr. ${doctor.name} is confirmed on ${ timestampToHumanDate(appointment.scheduledTimestamp)}`);
            
            // await sendNotification(doctor.phone, `You have a new appointment with ${patient.name} on ${timestampToHumanDate(appointment.date)}`);

            checkAndMarkMissedAppointment(appointment._id, appointment.patientId, scheduledTimestamp);
        }

        return res.status(201).json(appointment);   

    }
    catch(error){
        console.log("Appointment creation error", error);
        return res.status(400).json({error:error.message
    });
    };
};
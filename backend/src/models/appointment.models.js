import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true,
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true,
    },
    scheduledTimestamp: {
        type: Number, // Unix timestamp in milliseconds
        required: true,
    },
    status:{
        type:String,
        enum:["Booked","Missed","Rescheduled","Checked-In"],
        required:true,
    },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
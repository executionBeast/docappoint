import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        default:"patient",
    },
    password:{
        type:String,
        required:true,
    },
})
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
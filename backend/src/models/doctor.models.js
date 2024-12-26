import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
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
    qualification:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
import Doctor from "../models/doctor.models.js";
import sendNotification from "../utils/sendNotification.js";

export const getDoctor = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"});
        }   
        const doctor = await Doctor.findOne({email, password});
        if(doctor){
            return res.status(200).json(doctor);
        }
        else{
            return res.status(400).json({error:"Doctor not found"});
        }
    }
    catch(error){
        console.log("Get Doctor Error", error);
        return res.status(400).json({error:error.message});     
    }
};

export const createDoctor = async (req, res) =>{
    try{
        const {name, email, phone, address, qualification, password} = req.body;
        if(!name || !email || !phone || !address || !qualification || !password){
            return res.status(400).json({error:"All fields are required"});
        };
        const doctor = new Doctor({
            name,
            email,
            phone,
            address,
            qualification,
            password,
        });
        await doctor.save();
        if(doctor){
            await sendNotification(doctor.phone, `Welcome Dr. ${doctor.name} to our platform DocAppoint, You are a verified doctor now, you can start taking appointments`);
        }
        return res.status(201).json(doctor);        
    }
    catch(error){
        console.log("Doctor signup error", error);
        return res.status(400).json({error:error.message});
    };
};
import Patient from "../models/patient.models.js";   
import sendNotification from "../utils/sendNotification.js";

export const getPatient = async (req,res)=>{
    try{
        const {email, password} = req.body;
        console.log("Patient Form Data-->",email, password);
        
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"});
        }
        const patient = await Patient.findOne({email, password});
        if(patient){
            return res.status(200).json(patient);
        }
        else{
            return res.status(400).json({error:"Patient not found"});
        }

    }
    catch(error){
        console.log("Get Patient Error", error);
        return res.status(400).json({error:error.message});
    }
   
}

export const createPatient = async (req, res) =>{
    try{
        const {name, email, phone, address, password} = req.body;
        console.log("Patient Form Data-->",name, email, phone, address, password);
        if(!name || !email || !phone || !address || !password){
            return res.status(400).json({error:"All fields are required"});
        };

        const patient = new Patient({
            name,
            email,
            phone,
            address,
            password,
        });
        await patient.save();
        if(patient){
            await sendNotification(patient.phone, `Welcome ${patient.name} to our platform DocAppoint. Get consultation from top doctors on our platform`);
        }
        return res.status(201).json(patient);
    
        }
    catch(error){
        console.log("Patient signup error", error);
        return res.status(400).json({error:error.message});
    }

}

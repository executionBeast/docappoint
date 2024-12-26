import Patient from "../models/patient.models.js";   

export const getPatient = (req,res)=>{
    res.send("GET PATIENT")
}

export const createPatient = async (req, res) =>{
    try{
        const {name, email, phone, address, password} = req.body;
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
        return res.status(201).json(patient);
        }
    catch(error){
        console.log("Patient signup error", error);
        return res.status(400).json({error:error.message});
    }

}

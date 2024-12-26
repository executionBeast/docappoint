import Doctor from "../models/doctor.models.js";

export const getDoctor = async (req,res)=>{
    res.send("GET DOCTOR");
}

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
        return res.status(201).json(doctor);        
    }
    catch(error){
        console.log("Doctor signup error", error);
        return res.status(400).json({error:error.message});
    };
};
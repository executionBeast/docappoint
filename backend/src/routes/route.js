import express from 'express';
const router = express.Router() //Router(options?: express.RouterOptions):
//get patient
router.get("/patient",(req,res)=>{
    res.send("Patient Changaa sii");
})

//patient signup



export default router;
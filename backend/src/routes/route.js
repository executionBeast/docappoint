import express from 'express';
const router = express.Router() //Router(options?: express.RouterOptions):
import { getPatient, createPatient } from "../controller/patient.controller.js";
import { getDoctor, createDoctor } from "../controller/doctor.controller.js";
//patient routes
router.get("/patient",getPatient)
router.post("/patient",createPatient);


//doctor routes
router.get("/doctor",getDoctor)
router.post("/doctor",createDoctor);

export default router;
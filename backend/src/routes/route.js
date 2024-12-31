import express from 'express';
const router = express.Router() //Router(options?: express.RouterOptions):
import { getPatient, createPatient } from "../controller/patient.controller.js";
import { getDoctor, createDoctor } from "../controller/doctor.controller.js";
import { getAppointments, createAppointment } from "../controller/appointment.controller.js";


//patient routes
router.get("/patient",getPatient)
router.post("/patient",createPatient);


//doctor routes
router.get("/doctor",getDoctor)
router.post("/doctor",createDoctor);

//appointment routes
router.get("/appointment",getAppointments)
router.post("/appointment",createAppointment);

export default router;
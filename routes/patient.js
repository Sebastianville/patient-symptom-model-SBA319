import { Router } from "express";
import Patient from "../models/patient.js";

//*this method is the same as the one Colton showed us
export const patientRouter = new Router();

//! This is where step 5 starts. The main app (in this case index.js) does not anyting about this file yet. We have to do a couple of steps

//find all patients
patientRouter.get("/", async (req, res) => {
    try {
        const patients = await Patient.find()
        res.json(patients).status(200);
    } catch (e) {
        res.send("Server error").status(500)
    }
})

//get one patient through id
patientRouter.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
        if (!patient) return res.send("Patient not found").status(404)
        res.json(patient).status(200)
    } catch (e) {
        res.send("Server error").status(500)
    }
})

//Create a patient
patientRouter.post("/", async (req, res) => {
    try {
        const newPatient = await Patient.create(req.body);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).send("Invalid input");
    }
})

//delete a paitent 
patientRouter.delete("/:id", async(req,res) => {
    const removePatient = await Patient.findByIdAndDelete(req.params.id)
    if (!removePatient) res.send("Not found").status(404);
    else res.send("Deleted Successfully").status(204);
})
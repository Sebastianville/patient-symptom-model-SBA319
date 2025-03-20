import { Router } from "express";
import Symptom from "../models/symptoms.js";

//*this method is the same as the one Colton showed us
export const symptomsRouter = new Router();

// symptomsRouter.post("/", async (req, res) => {
//     const newSymptom = await Symptom.create(req.body);
//     res.json(newSymptom).status(201)
// });

symptomsRouter.post("/", async (req, res) => {
    try {
        const newSymptom = await Symptom.create(req.body);
        res.status(201).json(newSymptom);
    } catch (error) {
        res.status(400).send("Invalid input");
    }
});

symptomsRouter.get('/:id', async(req, res) => {
    const symptom = await Symptom.findById(req.params.id)
    if (!symptom) res.send("Symptom entry not found.").status(404)
    res.status(200).json(symptom)
})


symptomsRouter.get('/', async(req, res) => {
  try {
        const symptoms = await Symptom.find()
        res.json(symptoms).status(200);
    } catch (e) {
        res.send("Server error").status(500)
    }
})
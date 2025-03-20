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


symptomsRouter.patch('/:id', async(req, res) => {
    try {
         const symptom = await Symptom.findById(req.params.id)
         if(!symptom){
            return res.status(404).send("symptom not found")
        }
        //this method is longer but it allows you to add additional steps. The short way is by using findByIdAndUpdate()
        //update symptoms
        if (req.body.symptoms){
            symptom.symptoms = req.body.symptoms 
        }
        
        //update severity of the chat
        if(req.body.severity) {
            symptom.severity = req.body.severity
        }

        if(req.body.notes) {
            symptom.notes = req.body.notes
        }

        await symptom.save()
        res.json(symptom)
    } catch (e) {
        console.error(e)
        res.status(500).send(e.message)
    }
  })
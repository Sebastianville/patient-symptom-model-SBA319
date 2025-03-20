import mongoose from "mongoose";

//! Colton said that when we are referencing model to model we don't need to import. So the lines below were giving me issues
// import patient from "./patient"
// const Patient = mongoose.model('patient', patientSchema)

const symptomSchema = new mongoose.Schema({
    
    patient_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "Patient" 
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    symptoms: {
            type: String, 
            required: true
    },

    severity: {
        type: String,
        enum: ["Mild", "Moderate", "Severe"], 
        required: true
    },
    notes: {
        type: String,
        maxlength: 1000 
    }
});

export default mongoose.model("Symptom", symptomSchema);
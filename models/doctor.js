import mongoose from "mongoose";

const doctorSchema  = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    specality: {
        type: String,
        required: true
    },
    
    contact: {
        phone: {
            //maybe we can use regex to accept a 11 numbers
            type: String,
            required: true
        },
        email: {
            //need to learn how to accept emails
            type: String,
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Doctor", doctorSchema);
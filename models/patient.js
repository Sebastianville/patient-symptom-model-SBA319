import mongoose from "mongoose";

//! https://medium.com/@sergiubalauca/mongodb-mongoose-cascade-delete-trick-98aa3bfb7bb5
//! https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap to cascade delte 

const patientSchema  = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
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

    //! https://nour-karoui.medium.com/implementing-soft-delete-in-mongodb-with-mongoose-405c008d0e29
    //* Saw this and wanted to try it out. It is a soft delete. The record remainds in the databse but is marked as deleted. The data is hidden from normal queries but can be restored if needed
    is_deleted: { type: Boolean, default: false }, // Soft delete flag
    deleted_at: { type: Date, default: null }, // Timestamp of deletion
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Middleware to delete symptoms when a patient is deleted
patientSchema.pre("findOneAndRemove", async function (next) {
    try {
        const patientId = this.getQuery()._id;
        const symptomModel = this.model.db.model("Symptom", Symptom.schema); 
        //it is working even though it is depecrated. 
        await symptomModel.deleteMany({ patient_id: new mongoose.Types.ObjectId(patientId) });

        next();
    } catch (error) {
        console.error("Error while deleting symptoms:", error);
        next(error); 
    }
});

// Soft delete middleware instead of hard delete
patientSchema.pre("findOneAndRemove", async function (next) {
    try {
        const patientId = this.getQuery()._id;
        await this.model.findByIdAndUpdate(patientId, {
            is_deleted: true,
            deleted_at: new Date()
        });
        next();
    } catch (error) {
        console.error("Error while soft deleting patient:", error);
        next(error);
    }
});

export default mongoose.model("Patient", patientSchema);
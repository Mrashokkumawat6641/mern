import mongoose from 'mongoose';

const careersSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: [true, "Job Title is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        jobDescription: {
            type: String,
            required: [true, "Job Description is required"],
        },
        salary: {
            type: String,
            required: [true, "Salary is required"],
        },
        typeofemployement: {
            type: String,
            required: [true, "Type of employment is required"],
        }
    },
    { timestamps: true }
);

export default mongoose.models['careers'] || mongoose.model('careers', careersSchema);

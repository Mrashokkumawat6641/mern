import CareersModel from '../models/careers.model.js';
// import mongoose from 'mongoose'; 
export const addCareer = async (req, res) => {
    try {
        const { jobTitle, location, jobDescription, salary, typeofemployement } = req.body;

        if (!jobTitle || !jobDescription || !location || !salary || !typeofemployement) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newCareer = new CareersModel({ jobTitle, location, jobDescription, salary, typeofemployement });
        await newCareer.save();

        res.status(201).json({ message: "Career added successfully", career: newCareer });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getAllCareers = async (req, res) => {
    try {
        const careers = await CareersModel.find();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

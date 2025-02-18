import User from '../models/contactus.model.js';

export const addContactpost = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }


        const newFeedback = new User({ name, email, message });
        await newFeedback.save();

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error("Error in userFeedback: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

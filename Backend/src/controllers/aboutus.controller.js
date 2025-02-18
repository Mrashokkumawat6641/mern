import User from '../models/aboutus.models.js';
import mongoose from 'mongoose';

export const userFeedback = async (req, res) => {
    try {
        const { name, position, bio } = req.body;

        if (!name || !position || !bio) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

     
        const newFeedback = new User({ name, position, bio });
        await newFeedback.save();

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error("Error in userFeedback: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteAddPost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received ID:", id);  

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid ID format"); 
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedPost = await User.findByIdAndDelete(id);

        if (!deletedPost) {
            console.log("Post not found:", id); 
            return res.status(404).json({ message: 'Post not found' });
        }

        console.log("Post deleted successfully:", deletedPost);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

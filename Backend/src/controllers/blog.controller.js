import Blog from '../models/blog.model.js';  
export const blogPage = async (req, res) => {
    try {

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newPost = new Blog({ title, content });
        await newPost.save();

        console.log("✅ Post Created Successfully:", newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("❌ Error in blogPage API:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Blog.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

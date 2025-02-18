import mongoose from "mongoose";

const AboutusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        position: {
            type: String,
            required: [true, "Position is required"],
            trim: true,
        },
        bio: {
            type: String,
            required: [true, "Bio is required"],
            trim: true,
        }
    }, {
    timestamps: true,
}
)
export default mongoose.model.Aboutus || mongoose.model('aboutus', AboutusSchema)
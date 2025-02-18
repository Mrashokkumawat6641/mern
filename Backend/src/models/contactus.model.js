import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Position is required"],
            // trim: true,
        },
        message: {
            type: String,
            required: [true, "Bio is required"],
            trim: true,
        }
    }, {
    timestamps: true,
}
)
export default mongoose.model.contactus || mongoose.model('contactus', contactusSchema)
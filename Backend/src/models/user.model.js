// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false, 
        },
    },
    { timestamps: true }
);


UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });


UserSchema.pre('save', function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    if (this.password !== this._confirmPassword) {
       
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

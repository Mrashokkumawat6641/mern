import User from '../models/user.model.js';
import bcrypt from "bcrypt";
// import { generateToken } from '../utils/logger.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
export const users = async (req, res) => {
    try {
        const users = await mongoose.connection.db.collection('users').find({}).toArray();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const signup = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            fullName,
            email,
            password, 
        });

        newUser.confirmPassword = confirmPassword;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();

        return res.status(201).json({
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Login request received:', { email, password });

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log('Password incorrect for email:', email);
            return res.status(401).json({ message: 'Incorrect password' });
        }

        console.log('Password verified, login successful...');
        res.status(200).json({
            message: 'Login successful',
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// logout user



export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // console.log("Error in Logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//update profile

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
        res.send("Hello World");
    }
    catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/passwordreset/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a put request to: \n\n ${resetUrl}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset Token',
            text: message,
        });

        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        console.error('Error in forgotPassword controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

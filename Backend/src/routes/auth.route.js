import express from 'express';
import { body } from "express-validator";
import {    
    signup,
    login,
    logout,
    users,
    updateProfile,
    checkAuth,
    forgotPassword,

} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

const validateDataSignup = [
    body('fullName').isString(),
    body('email').isEmail(),  
    body('password').isString(),
    body('profilePic').isString(),
];

router.post('/signup', validateDataSignup, signup);
router.post('/login', validateDataSignup, login);
router.post('/logout', logout);
router.get('/users', users);
// router.delete('/deleteAll', deleteAllUsers);  // ✅ FIXED missing function
router.post('/forgotPassword', forgotPassword);
router.put("/updateProfile", updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;

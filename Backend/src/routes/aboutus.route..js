import express from 'express';
import { body } from "express-validator";
import { deleteAddPost, userFeedback } from '../controllers/aboutus.controller.js';

const router = express.Router();

const validateDataSignup = [
    body('Name').isString(),
];

router.post('/addpost', validateDataSignup, userFeedback);
router.delete('/deletepost/:id', deleteAddPost);

export default router;

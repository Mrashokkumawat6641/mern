import express from 'express';
import { addContactpost } from '../controllers/contactus.controller.js';

const router = express.Router();

router.post('/addContactpost', addContactpost);

export default router;
import express from 'express';
import { addCareer, getAllCareers } from '../controllers/Careers.controller.js';

const router = express.Router();


router.post('/addCareers', addCareer);
router.get('/getAllJobs', getAllCareers);

export default router;

import express from 'express';
import { blogPage } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/addposts', blogPage); 

export default router;

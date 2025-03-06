
// export default app;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import feedbackRoutes from './routes/aboutus.route..js';
import blogRoute from './routes/blog.route.js';
import contactusRoute from './routes/contactus.route.js';
import careerRoutes from './routes/career.route.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const firebaseConfig = {
  apiKey: "AIzaSyDPgR-n8tYCZlXMlkF0EbvfXAuM-8lIZAE",
  authDomain: "mern-c2a95.firebaseapp.com",
  projectId: "mern-c2a95",
  storageBucket: "mern-c2a95.firebasestorage.app",
  messagingSenderId: "760291447302",
  appId: "1:760291447302:web:63ce2c2e760b555aa56987",
  measurementId: "G-M32W9P74W1"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// CORS Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Match frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true, // Allow cookies or Authorization headers
  })
);

// Other Middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Database Connection
db();


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/add', feedbackRoutes);
app.use('/api/blog', blogRoute);
app.use('/api/contactus', contactusRoute);
app.use('/api/careers', careerRoutes);


export default app;

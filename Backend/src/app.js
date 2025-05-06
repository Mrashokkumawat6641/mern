
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


import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
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

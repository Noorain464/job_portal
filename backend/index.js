import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import CompanyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Define allowed origins
const allowedOrigins = ['http://localhost:5173'];

// Configure CORS options
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','withCredentials'],
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

// APIs
app.use("/api/user", userRoute);
app.use("/api/company", CompanyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Start server
app.listen(port, () => {
    connectDB(); // Connect to the database
    console.log(`Server running at port ${port}`);
});

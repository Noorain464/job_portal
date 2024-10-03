// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import CompanyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
dotenv.config({});
const app = express();

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"I am coming from backend",
//         success:true
//     })
// })

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const port = process.env.PORT || 3000 ;

//api's

app.use("/api/user",userRoute);
app.use("/api/company",CompanyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application",applicationRoute)

app.listen(port,()=>{
    connectDB();
    console.log(`Server running at port ${port}`);
})

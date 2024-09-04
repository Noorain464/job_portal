// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({});
const app = express();

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"I am coming from backend",
//         success:true
//     })
// })

//middleware
app.use(express.json);
app.use(express.urlencoded({extended:true}));


const port = process.env.PORT || 3000 ;
app.listen(port,()=>{
    connectDB();
    console.log(`Server running at port ${port}`);
})

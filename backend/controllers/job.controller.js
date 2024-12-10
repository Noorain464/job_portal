import {Job} from "../models/job.model.js"
export const postJob = async(req,res)=>{
    try {
        const {title, description,requirements,salary,location,experience,position,companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success : false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            companyId : companyId,
            created_by: userId
        });
        return res.status(201).json({
            message:"New job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
} 

export const getAllJobs =  async (req,res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                // "i" is for case insensitivity
                {title:{$regex:keyword,$options:"i"}},  
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message:"Job not found.",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (res,req) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message : "JObs not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJob = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"JOb not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
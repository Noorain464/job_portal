import { populate } from "dotenv";
import { Application } from "../models/applications.model";
export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const {id:jobId} = req.params.id;
        if(!jobId){
            return res.status(404).json({
                message:"JOb id is required",
                success : false
            })
        }
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});

        // check if job already applied
        if(existingApplication){
            return res.status(404).json({
                message:"You have already applied",
                success:false
            })
        }

        // check if job exist
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        
        // create new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id)
        await job.save();
        return res.status(200).json({
            message:"Job applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        
        if(!application){
            return res.status(404).json({
                message:"You didn't apply for this job",
                success:false
            })
        }
        
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);        
    }
}

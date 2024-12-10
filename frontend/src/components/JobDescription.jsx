import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
const JobDescription = () => {
    const { user } = useSelector((state) => state.auth);
    const { singleJob } = useSelector((state) => state.job);
    const params = useParams();
    const jobId = params.id;
    const isInitiallyApplied = singleJob?.application?.some(application => application?.applicant?._id === user?._id) || false;
    const [isApplied,setIsApplied] = useState(isInitiallyApplied);
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/getJob/${jobId}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(res.data.job.application.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost"> {singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-full ${isApplied ? "bg-gray-600 text-white cursor-not-allowed " : "bg-[#F83002] text-white"}`}>{isApplied ? "Applied" : "Apply Now"}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                <h1 className='font-bold my-1'>Total Applicants <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
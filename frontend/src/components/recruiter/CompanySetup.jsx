import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CompanySetup = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input,file})
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", input.name);
        formdata.append("description", input.description);
        formdata.append("website", input.website);
        formdata.append("location", input.location);

        if(input.file){
            formdata.append("file", input.file);
        }
        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formdata,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button variant="outline" className="flex items-center gap-2 text-gray-500 font semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold textxl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-8 bg-[#6A38C2] text-white">Update</Button>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
import React from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant.jsx'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { setLoading} from '@/redux/authSlice'
function Signup() {
    const [input, setInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth);
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const changeFileHandler = (e)=>{
        setInput({
            ...input,
            file: e.target.files?.[0]
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
    
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
    
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        }finally{
            dispatch(setLoading(false));
        }
    };
    
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                        />

                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                        />

                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="number"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                        />

                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />

                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer" />
                                <Label htmlFor="r1">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer" />
                                <Label htmlFor="r2">Student</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className='crusor-pointer'
                            />
                        </div>
                    </div>{
                        loading ? (
                            <Button className='w-full my-4'>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </Button>
                        ) : 
                        <Button type='submit' className='bg-[#6A38C2] hover:bg-[#5b30a6] text-white p-2 w-full my-4'>Sign Up</Button>

                    }
                    <span>Already have an account? <Link to="/login" className="text-[#5b30a6]"><span>Login</span></Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label.jsx';
import { Input } from './ui/input.jsx';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice'; 

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '', 
        file: null, 
    });

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0] || null;
        setInput(prev => ({
            ...prev,
            file
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); 

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills); 
        if (input.file) {
            formData.append("resume", input.file); 
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials:true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false); 
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="fullname" className="text-right">Name</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3 h-10 px-4 py-2"
                                required
                            />
                        </div>
                        
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3 h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3 h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3 h-10 px-4 py-2"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3 h-10 px-4 py-2"
                                placeholder="e.g., JavaScript, React, Node.js"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                onChange={fileChangeHandler}
                                type="file"
                                accept="application/pdf"
                                className="col-span-3"
                            />
                            {/* Optionally display the current resume */}
                            {user?.profile?.resume && (
                                <div className="col-span-3">
                                    <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        View Current Resume
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className='w-full my-4' disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait...
                            </Button>
                        ) : (
                            <Button type='submit' className='bg-[#6A38C2] hover:bg-[#5b30a6] text-white p-2 w-full my-4'>
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;

import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
function Signup() {
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"

                        />

                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"

                        />

                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="number"

                        />

                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                        />

                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="r2" />
                                <Label htmlFor="r2">Student</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
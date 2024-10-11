import React from 'react'
import {Input} from '../components/ui/input'
import {Button} from '../components/ui/button'
import {Search} from 'lucide-react'
function HeroSection() {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get <span className='text-[#6A38C2]'>Hired</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque mollitia corporis fuga tempore.</p>
            <div className='flex w-[40%] shadow-lg mx-auto'>
                <Input
                type='text'
                placeholder='Search...'
                className='w-full rounded-l-full'/>
                <Button className='rounded-r-full bg-[#6A38C2]'><Search className='w-5 h-5 text-white'/></Button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection
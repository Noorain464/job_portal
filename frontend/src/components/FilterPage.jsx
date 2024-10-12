import React from 'react'
import { RadioGroup,RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'

const filterData = [
    {
        filterType: 'Location',
        array: [
            'Delhi',
            'Mumbai',
            'Chennai',
            'Kolkata'
        ]
    },
    {
        filterType: 'Industry',
        array: [
            'IT',
            'Marketing',
            'Finance',
            'Healthcare'
        ]
    },
    {
        filterType: 'Salary',
        array: [
            '10k - 20k',    
            '20k - 30k',
            '30k - 40k',
            '40k - 50k'
        ]
    }
]

function FilterPage() {
  return (
    <div className='w-full bg-white rounded-md p-3'>
        <h1 className='fotn-bold text-lg text-[#6A38C2]'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup>
            {
                filterData.map((item, index) => (
                    <div>
                        <h1 key={index} className='font-bold text-lg'>{item.filterType}</h1>
                        {
                            item.array.map((item, index) => {
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} key={index}/>
                                        <Label>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterPage
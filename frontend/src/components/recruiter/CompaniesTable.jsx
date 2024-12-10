import React from 'react'
import { Table } from '../ui/table'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '../ui/table'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="" />
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>10/10/2020</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                        <Edit2 className='w-4'/>
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            
                        </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
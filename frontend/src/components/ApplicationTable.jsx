import { Table } from './ui/table'
import React from 'react'
import { TableCaption,TableHeader,TableBody,TableRow,TableCell,TableHead } from './ui/table'
import { Badge } from './ui/badge'
const ApplicationTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of your applications</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1, 2, 3].map((item,index) => (
                        <TableRow key={index}>
                            <TableCell>10/10/2020</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell>Software Engineer</TableCell>
                            <TableCell><Badge className={'bg-[#6A38C2] text-white'} variant="ghost">Selected</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default ApplicationTable
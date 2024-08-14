import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    // const { companies, searchCompanyByText } = useSelector(store => store.company);
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate()

    useEffect(()=> {
         const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
         })
         setFilterJobs(filteredJob)
    },[allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A lsit of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAdminJobs?.length <= 0 ? <span>You haven't register any company yet</span> : (
                            <>
                                {
                                    filterJobs?.map((job) => (
                                     

                                        <tr>
                                            
                                            <TableCell>{job?.company?.name}</TableCell>
                                            <TableCell>{job?.title}</TableCell>
                                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className="text-right">
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className="w-32">
                                                        <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
                                                        </div>
                                                        <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                                                            <Eye className='w-4' />
                                                            <span>Applicants</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>
                                        
                                    ))
                                }
                            </>
                        )
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default AdminJobsTable

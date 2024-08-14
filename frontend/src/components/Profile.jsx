import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJob'
import Footer from './shared/Footer'

// const skills = ["Html", "Css", "Javscript", "ReactJs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth)
    const skills = user?.profile?.skills
    console.log(skills)
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white  my-5 px-4 md:px-0'>
                <div className='border border-gray-200 rounded-2xl p-4'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="lg:h-24 lg:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button  onClick={()=> setOpen(true)} className="text-right w-16" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>

                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>

                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl px-4 md:px-0'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Application Table */}
                <AppliedJobTable />
            </div>
            {open && <UpdateProfileDialog open={open} setOpen={setOpen}/>}
            <Footer/>
            
        </div>
    )
}

export default Profile

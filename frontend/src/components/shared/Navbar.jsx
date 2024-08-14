import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, Menu, MenuIcon, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'

const Navbar = () => {
    const [header, setHeader] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async (e) => {
        try {
            const res = await axios.get('https://jobportal-vzrk.onrender.com/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }

    useEffect(() => {
        const scrollYPos = window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false);
        });
        //remove event
        return () => window.removeEventListener('scroll', scrollYPos)
    })

    return (
        <header className={`sticky container mx-auto top-0 z-30 max-w-7xl transition-all ${header ? 'py-4 bg-white shadow-lg ' : 'py-1'} `}>
            {/* computer nav */}
            <div className='bg-white hidden md:block'>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                    <div onClick={()=>navigate('/')} className='cursor-pointer'>
                        <h1 className='text-2xl font-bold '>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </div>

                    <div className='flex items-center gap-12 '>
                        <ul className='flex font-medium items-center gap-5'>

                            {
                                user && user.role === "recruiter" ? (
                                    <>
                                        <li><Link to={'/admin/companies'}>Companies</Link></li>
                                        <li><Link to={'/admin/jobs'}>Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li><Link to={'/jobs'}>Jobs</Link></li>
                                        <li><Link to={'/browse'}>Browse</Link></li>
                                    </>
                                )
                            }

                        </ul>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5c1ec8]">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-grey-600'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            )
                        }

                    </div>

                </div>

            </div>
            {/* mobile nav */}
            <div className='bg-white md:hidden block '>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-12 '>
                    <div>
                        <h1 onClick={()=>navigate('/')} className='text-xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </div>
                    <div className='flex gap-2'>
                    {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button className="w-16" variant="outline">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5c1ec8] w-16">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-grey-600'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            )
                        }
                        <Button className="" variant='outline' onClick={() => setMobileNavOpen(prev => !prev)}><MenuIcon className="" /></Button>
                    </div>
                    



                </div>
                {mobileNavOpen && (
                        <div
                            onClick={() => setMobileNavOpen(false)}
                            className='md:hidden p-4  bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'>
                             {
                                user && user.role === "recruiter" ? (
                                    <>
                                        <Link to={'/admin/companies'}>Companies</Link>
                                        <Link to={'/admin/jobs'}>Jobs</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to={'/'}>Home</Link>
                                        <Link to={'/jobs'}>Jobs</Link>
                                        <Link to={'/browse'}>Browse</Link>
                                    </>
                                )
                            }
                          
                        </div>

                    )}

            </div>
        </header>


    )
}

export default Navbar

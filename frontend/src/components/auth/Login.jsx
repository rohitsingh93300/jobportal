import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const {loading} = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post('https://jobportal-vzrk.onrender.com/api/v1/user/login', input, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true,
            });
            if(res.data.success){
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        } finally{
            dispatch(setLoading(false));
        }
    }

    return (
        <div >
            <Navbar />
            <div className='flex items-center justify-center lg:max-w-7xl  mx-auto'>
                <form onSubmit={submitHandler} className='md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Email" />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Password" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    {
                        loading?<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>:
                    <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Dont't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login

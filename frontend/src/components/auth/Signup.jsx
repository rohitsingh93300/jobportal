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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading} = useSelector(store => store.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post('https://jobportal-vzrk.onrender.com/api/v1/user/register', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <div >
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 md:px-0'>
                <form onSubmit={submitHandler} className='md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Email" />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="number"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Phone Number" />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password" />
                    </div>
                    <div className='flex flex-wrap items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="r1"
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
                                    id="r2"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2 '>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                            <Button type="submit" className="w-full my-4">SignUp</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup

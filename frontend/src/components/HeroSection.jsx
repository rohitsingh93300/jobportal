import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from './ParticlesBg';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse");
    }

    return (
        <>
        <div>

        <ParticlesBg id="particles" className="z-0"/>
        </div>
        <div className='text-center px-4 md:px-0 z-10'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-4xl md:text-5xl font-bold bg-white'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='bg-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel provident sapiente libero nostrum praesentium?</p>
                <div className='flex w-[70%] md:w-[40%] shadow-lg bg-white border border-gray-20 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38c2]">
                        <Search className='w-5 h-5' />
                    </Button>
                </div>
            </div>

        </div>
        </>
    )
}

export default HeroSection

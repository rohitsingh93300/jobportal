import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

// const randomJobs = [1,2,.3,4,5,6,7,8]
const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className='max-w-7xl mx-auto my-20 px-4 md:px-16 bg-white '>
      <h1 className='text-3xl md:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job <br/> Openings</h1>
     {/* multiple job cards display here */}
     <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 my-5">
        {
            allJobs.length <= 0 ? <span>No jobs Available</span>: allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
        }
     </div>
    </div>
  )
}

export default LatestJobs

import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function Jobcard({job}) {

const navigate=useNavigate()




  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-center items-center '>
        <img src={job.companyId.image} className='rounded-md h-8' alt="" />
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex justify-between items-center  mt-2'>
        <span className='font-bold text-blue-600'>{job.location}</span>
        <span className=' font-mono text-yellow-700'>{job.level}</span>
      </div>
      <p dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}} className='mt-4 text-gray-500'></p>
      <div className='flex justify-between mt-2'>
        <button className='bg-blue-600 text-white px-2 py-2 rounded-md' onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}>Apply Now</button>
        <button className='bg-red-600 text-white px-2 py-2 rounded-md'  onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}>Learn More</button>
      </div>
    </div>
  )
}

export default Jobcard

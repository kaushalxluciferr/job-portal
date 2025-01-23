import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import SetLoading from '../components/SetLoading'
import Navbar from '../components/Navbar'
import { assets, jobsData } from '../assets/assets'
import moment from 'moment'
import Jobcard from '../components/Jobcard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
function ApplyJob() {

  const navigate=useNavigate() 
  const{jobs,backendUrl,userApplication,user,resume,name}=useContext(AppContext)
  const {id}=useParams()
  
  const [jobData,setjobData]=useState(null)
  

// get single job info
const getJobs=async()=>{
try{
const {data}=await axios.get(backendUrl+`/api/jobs/${id}`)
if(data.success)
{
  setjobData(data.job)
}
else
{
  toast.error(data.message)
}
}catch(error)
{
toast.error(error.message)
}
}

useEffect(()=>{
 
    getJobs()
},[id])




const applyJobHandle=async()=>{
  try{
   if(!user)
   {
    navigate('/')
    return toast.error('login first to apply')
   }

    if(!resume)
    {
      navigate('/')
      return toast.error("Upload resume first")
    }

    const userId=localStorage.getItem('userId')
    
    const {data}=await axios.post(backendUrl+'/api/v1/apply',{userId,jobId:jobData._id})
    console.log(data);
    
if(data.success)
{
  toast.success(data.message)
}
else{
  toast.error(data.message)
}

  }catch(error)
  {
toast.error(error.response.data.message)
  }
}





  return jobData?(
 <>
 <Navbar/>
 <div className='min-h-screen flex flex-col  py-10  container px-4 2xl:px-20 mx-auto'>
<div className='bg-white text-black rounded-lg w-full'>
  <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-200 border border-sky-400 '>
    <div className='flex flex-col md:flex-row items-center'>
      <img src={jobData.companyId.image} className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' alt="" />
      <div className='text-center md-text-left text-neutral-700 '>
        <h1 className='text-2xl. font-medium sm:text-4xl'>{jobData.title}</h1>
        <div className='flex flex-row flex-wrap mt-4 max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 '>
          <span className='flex items-center gap-1'>
            <img src={assets.suitcase_icon} alt="" />
            {jobData.companyId.name}
          </span>
          <span className='flex items-center gap-1'>
            <img src={assets.location_icon} alt="" />
            {jobData.location}
          </span>
          <span className='flex items-center gap-1'>
            <img src={assets.person_icon} alt="" />
            {jobData.level}
          </span>
          <span className='flex items-center gap-1'>
            <img src={assets.money_icon} alt="" />
            CTC: {(jobData.salary)/1000+"k"}
          </span>
        </div>
      </div>
    </div>
    <div className='flex flex-col justify-center text-end text-sm max-md:max-auto max-md:text-center'>
      <button className='bg-black p-2 px-2 text-white text-[16px] rounded-md' onClick={()=>applyJobHandle()}>Apply Now</button>
      <p className='mt-4 font-medium'>Posted {moment(jobData.date).fromNow()} </p>
    </div>
  </div>
</div>

<div className='flex flex-col lg:flex-row justify-between items-start'>
  <div className='w-full lg_w-1/2'>
    <h2 className='font-bold text-2xl mb-4 '>Job Description</h2>
    <div  dangerouslySetInnerHTML={{__html:jobData.description}}>
    </div>
<button className='bg-black mt-4 p-2 px-2 text-white text-[16px] rounded-md' onClick={()=>applyJobHandle()}>Apply Now</button>
  </div>
  {/* more jobs display */}
  <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:;-8 space-y-5 '>
<h2 className='font-bold ml-10 text-xl'>More Jobs From {jobData.companyId.name}</h2>
  {jobs.filter(job=>job._id!==jobData._id && job.companyId._id===jobData.companyId._id ).filter(job=>{
    // displaying non applied jobs only
    const appliedJobsId=new Set(userApplication.map(app=>app.jobId&&app.jobId._id))
    // return true if user have not applied fro the job
    return !appliedJobsId.has(job._id)
  }).slice(0,4).map((job,index)=>
  <Jobcard key={index} job={job} />
  )}
  </div>
</div>

 </div>
 <Footer/>
 </>
  ): (<SetLoading/>)
}

export default ApplyJob

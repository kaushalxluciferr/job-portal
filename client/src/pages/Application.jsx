import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
function Application() {

const [isEdit,setisEdit]=useState(false)
const [resume,setresume]=useState()


const {userData,user,backendUrl,userApplication,fetchDetail,fetchApplications}=useContext(AppContext)


const updateResume=async()=>{
  try{
    const userId=localStorage.getItem('userId')
    const formData=new FormData()
    formData.append('resume',resume)
    formData.append('userId',userId)
    console.log(userId);
    
    const {data}=await axios.post(backendUrl+'/api/v1/update-resume',formData)
    console.log(data);
    
   if(data.success)
   {
    toast.success(data.message)
    await fetchDetail();
   }else{
    toast.error(data.message)
   }

  }catch(error)
  {
    toast.error(error.message)
  }
  setresume(null)
  setisEdit(false)
}


useEffect(()=>{
if(user)
{
  fetchApplications()
}
},[user])

  return (
    <>
<Navbar/>

<div className='container  px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
  <h2 className='text-xl font-semibold'>Your Resume</h2>
  <div className='flex gap-2 mb-6px mt-3 '>
    {
      isEdit||userData&&userData.resume===""
      ?<>
      <label className='flex items-center' htmlFor="resumeUpload">
      <p className=' bg-blue-100 text-blue-600 px-4 py-2 rounded-lg '>{resume?resume.name:"select resume"}</p>
      <input hidden type="file" id='resumeUpload' onChange={e=>setresume(e.target.files[0])}  accept='application' />

<img src={assets.profile_upload_icon} className='ml-2' alt="" />
      </label>
      <button onClick={updateResume} className='bg-black text-white border  rounded-lg px-4 py-2'>Save</button>
      
      </>: <div className='flex gap-3'>
        <a target='_blank' href={userData.resume} className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</a>
        <button onClick={()=>setisEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
      </div>
    }
  </div>

{/* displaying jon table */}

<h2 className='text-xl lg:text-2xl font-semibold mt-4 '>Jobs Applied</h2>
<table className='min-w-full border shadow rounded-lg mt-4 '>
  <thead>
    <tr>
      <th className='py-3 px-4 border-b text-left'>Company</th>
      <th className='py-3 px-4 border-b text-left'>Job Title</th>
      <th className='py-3 max-sm:hidden px-4 border-b text-left'>Location</th>
      <th className='py-3 px-4 max-sm:hidden border-b text-left'>Date</th>
      <th className='py-3 px-4 border-b  text-left'>Status</th>
    </tr>
  </thead>
  <tbody>
    {userApplication.map((item,index)=>true?(
      <tr key={index}>
        <td className='py-3 px-4 flex items-center gap-2 border-b'>
          <img src={item.companyId.image} className='w-8 h-8' alt="" />
          {item.companyId.name}
        </td>
        <td className='py-2 px-4 border-b'>{item.jobId.title}</td>
        <td  className='py-2 px-4 border-b max-sm:hidden'>{item.jobId.location}</td>
        <td  className='py-2 px-4 border-b max-sm:hidden'>{moment(item.date).format('MMMM DD, YYYY')}</td>
        <td  className='py-2 px-4 border-b'><span className={`px-2 py-2 rounded-lg ${item.status==='pending'?'bg-blue-400':item.status==="Accepted"?'bg-green-400':'bg-rose-400'}`}>{item.status}</span></td>
      </tr>
    ):(null))}
  </tbody>
</table>


</div>
<Footer/>

    </>
  )
}

export default Application

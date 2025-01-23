import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function ViewApplications() {

    const {backendUrl,companytoken}=useContext(AppContext)
const [applicant,setapplicants]=useState([])

const fetchApplicants=async ()=>{
    try{
const {data}=await axios.get(backendUrl+'/api/company/applicants',{headers:{token:companytoken}})

if(data.success)
{
    setapplicants(data.applications.reverse());
}
else{
    toast.error(data.message)
}
    }catch(error)
    {
        toast.error(error.message)
    }
}
// update status
const updatestatus=async(id,status)=>{
try{
const {data}=await axios.post(backendUrl+'/api/company/change-status',{id,status},{
    headers:{token:companytoken}
})
if(data.success)
{
    toast.success(data.message)
    fetchApplicants()
}else{
    toast.error(data.message)
}
}catch(error)
{
toast.error(error.message)
}
}


useEffect(()=>{
    if(companytoken)
    {
        fetchApplicants()
    }
},[companytoken])

  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm '>
            <thead>
                <tr className='border-b-2'>
                    <th className='py-2 px-4 text-left'>SN</th>
                    <th className='py-2 px-4 text-left'>Username</th>
                    <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
                    <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                    <th className='py-2 px-4 text-left'>Resume</th>
                    <th className='py-2 px-4 text-left'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    applicant.map((item,index)=>(
                        <tr key={index} className='text-gray-700 '>
                            <td className='py-2 px-4 border-b text-center'>{index+1}</td>
                            <td className='py-2 px-4 border-b text-center flex items-center' ><img className='w-10 h-10 rounded-full mr-3 max-sm:hidden ' src={item.userId.image} alt="" />
                            <span>{item.userId.name}</span>
                            </td>
                            <td className='py-2 px-4 border-b max-sm:hidden'>
                                {item.jobId.title}
                            </td  >
                            <td className='py-2 px-4 border-b max-sm:hidden'>{item.jobId.location}</td>
                            <td className='py-2 px-4 border-b'>
                                <a className='bg-blue-50 px-2 py-2 rounded inline-flex gap-2' href={item.userId.resume} target='_blank'>Resume <img src={assets.resume_download_icon} alt="" /></a>
                            </td>
                            <td className='py-2 px-4 border-b relative'>
                                {item.status==="pending"?<>
                                <div className='relative inline-block text-left group'>
                                    <button className='action-button'>...</button>
                                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-4 w-32 bg-white border border-gray-300 rounded-md shadow group-hover:block  '>
                                        <button className='block w-full text-left px-4 py-2 bg-green-400 rounded-md hover:bg-fuchsia-200' onClick={()=>updatestatus(item._id,"Accepted")} >Accept</button>
                                        <button className='block w-full text-left px-4 py-2 bg-red-400 rounded-md hover:bg-gray-400' onClick={()=>updatestatus(item._id,"Rejected")}>Reject</button>
                                    </div>
                                    
                                </div>
                                </>:<>{item.status}</>}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications

import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
function ManageJob() {
    const navigate=useNavigate()
  return (
    <div className='container p-4 max-w-5xl'>
     <div className='overflow-x-auto'>
        <table className='min-w-full bg-whit border border-blue-300 max-sm:text-sm'>
            <thead>
                <th className='py-2 px-4 border-b text-left max-sm:hidden'>SN</th>
                <th className='py-2 px-4 border-b text-left'>Job Title</th>
                <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className='py-2 px-4 border-b  text-center'>Applicants</th>
                <th className='py-2 px-4 border-b text-left'>Visible</th>
            </thead>
            <tbody>
              {
                manageJobsData.map((item,index)=>(
                    <tr className='text-gray-800 ' key={index}>
                        <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                        <td className='py-2 px-4 border-b'>{item.title}</td>
                        <td className='py-2 px-4 border-b max-sm:hidden'>{moment(item.date).format('ll')}</td>
                        <td className='py-2 px-4 border-b max-sm:hidden'>{item.location}</td>
                        <td className='py-2 px-4 border-b text-center'>{item.applicants}</td>
                        <td className='py-2 px-4 border-b'><input className='scale-125 ml-4' type="checkbox" /></td>
                    </tr>
                ))
              }  
            </tbody>
        </table>


<div className='mt-5 flex justify-end'>
<button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white text-md px-2 py-2 rounded-lg lg:text-xl'>Add new Job</button>
</div>
     </div>
    </div>
  )
}

export default ManageJob

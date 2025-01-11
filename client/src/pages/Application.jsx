import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
function Application() {

const [isEdit,setisEdit]=useState(false)
const [resume,setresume]=useState("")
  return (
    <>
<Navbar/>

<div className='container  px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
  <h2 className='text-xl font-semibold'>Your Resume</h2>
  <div className='flex gap-2 mb-6px mt-3 '>
    {
      isEdit?<>
      <label className='flex items-center' htmlFor="resumeUpload">
      <p className=' bg-blue-100 text-blue-600 px-4 py-2 rounded-lg '>Select Resume</p>
      <input hidden type="file" id='resumeUpload' onChange={e=>setresume(e.target.files[0])} accept='application' />

<img src={assets.profile_upload_icon} className='ml-2' alt="" />
      </label>
      <button onClick={e=>setisEdit(false)} className='bg-black text-white border  rounded-lg px-4 py-2'>Save</button>
      
      </>: <div className='flex gap-3'>
        <a href="" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</a>
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
    {jobsApplied.map((item,index)=>true?(
      <tr key={index}>
        <td className='py-3 px-4 flex items-center gap-2 border-b'>
          <img src={item.logo} className='w-8 h-8' alt="" />
          {item.company}
        </td>
        <td className='py-2 px-4 border-b'>{item.title}</td>
        <td  className='py-2 px-4 border-b max-sm:hidden'>{item.location}</td>
        <td  className='py-2 px-4 border-b max-sm:hidden'>{moment(item.date).format('MMMM DD, YYYY')}</td>
        <td  className='py-2 px-4 border-b'><span className='bg-blue-400 px-2 py-2 rounded-lg'>{item.status}</span></td>
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

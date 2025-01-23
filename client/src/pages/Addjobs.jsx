import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
function Addjobs() {

    const {backendUrl,companytoken}=useContext(AppContext)
const editorRef=useRef(null)
const quillRef=useRef(null)
    const [level,setlevel]=useState("Beginner Level ")
    const [location,setlocation]=useState('Banglore')
    const [category,setcategory]=useState('Programming')
    const [title,settitle]=useState('')
const [salary,setsalary]=useState(0)


const handleSubmit=async(e)=>{
e.preventDefault()
try{
const description=quillRef.current.root.innerHTML

const {data}=await axios.post(backendUrl+`/api/company/post-job`,{title,description,location,category,level,salary},{
    headers:{token:companytoken}
})
if(data.success)
{
toast.success("job Added Successfully")
setsalary(0)
settitle("")
quillRef.current.setContents([]);
setcategory('Programming')
setlevel("Beginner Level")
setlocation("Banglore")

}
else{
    toast.error(data.message)
}
}catch(error)
{
    toast.error(error.message)
}
}



    useEffect(()=>{
// initiate quill only once
if(!quillRef.current&&editorRef.current)
{
    quillRef.current=new Quill(editorRef.current,{
        theme:'snow',
    })
}
    },[])
  return (
    <div>
      <form onSubmit={handleSubmit} className='container p-4 flex flex-col w-full items-start gap-3'>
<div className='w-full'>
    <p className='mt-2 mb-2'>Job Title</p>
    <input className=' border-2 border-blue-300 rounded w-full  px-3 py-2 ' type="text" required placeholder='Enter Job Title' onChange={(e)=>settitle(e.target.value)} value={title}  />
</div>
<div className='w-full '>
    <p className='my-2'>Job Description</p>
    <div ref={editorRef}>
        
    </div>
</div>

<div className='flex flex-col lg:flex-row lg:gap-10'>
    <div>
        <p className='mt-2 mb-2'>Job Category</p>
        <select className='w-full px-3 py-2 border-2 border-blue-300 rounded' onChange={(e)=>setcategory(e.target.value)} >
{JobCategories.map((item,index)=>(
    <option key={index} value={item}>{item}</option>
))}

        </select>
    </div>

    <div>
        <p className='mt-2 mb-2'>Job Location</p>
        <select className='w-full px-3 py-2 border-2 border-blue-300 rounded' onChange={(e)=>setlocation(e.target.value)} >
            {JobLocations.map((item,index)=>(
                <option value={item} key={index}>{item}</option>
            ))}
        </select>
    </div>
    <div>
        <p className='mt-2 mb-2'>Job Level</p>
        <select className='w-full px-3 py-2 border-2 border-blue-300 rounded' onChange={(e)=>setlevel(e.target.value)} >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
        </select>
    </div>

</div>
    <div>
        <p className='mb-2'>Job Salary</p>
        <input min={0} className='w-full px-3 py-2 border-2 border-blue-300' type="number" placeholder='Enter Salary' onChange={(e)=>setsalary(e.target.value)} value={salary} name="" id="" />
    </div>
<button className='w-1/2 bg-red-400 items-center px-3 py-2 text-white text-xl rounded-lg  '>Create Job</button>
      </form>
    </div>
  )
}

export default Addjobs

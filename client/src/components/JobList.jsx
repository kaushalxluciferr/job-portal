import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import Jobcard from './Jobcard'

function JobList() {
const {searchFilter,isSearch,setsearchFilter,jobs,setjobs}=useContext(AppContext)

const [currpage,setcurrpage]=useState(1)
const [show,setshow]=useState(true)

const [filterCategories,setfilterCategories]=useState([])
const [filterLocation,setfilterLocation]=useState([])

const [filterJobs,setfilterJobs]=useState(jobs)

const CategoryChange=(category)=>{
setfilterCategories(prev=>prev.includes(category)?prev.filter(c=>c!==category):[...prev,category])
}

const locationChange=(location)=>{
    setfilterLocation(prev=>prev.includes(location)?prev.filter(c=>c!==location):[...prev,location])
}

// console.log(filterJobs);

useEffect(()=>{
const matchedCategory=job=>filterCategories.length===0||filterCategories.includes(job.category)
const matchedLocation=job=>filterLocation.length===0||filterLocation.includes(job.location)

const matchedTitle=job=>searchFilter.title===""||job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
const matchLocation=job=>searchFilter.location===''||job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

const newFilterJob=jobs.slice().reverse().filter(
    job=>matchedCategory(job)&&matchedLocation(job)&&matchedTitle(job)&& matchLocation(job)
)


setfilterJobs(newFilterJob)
setcurrpage(1)

},[jobs,filterCategories,filterLocation,searchFilter])

  return (
    <div className='container 2xl:px-12 mx-auto flex flex-col lg:flex-row max-lg:space-y-5 py-5'>
      {/* crating a sidebar view */}
<div className='w-full lg:w-1/4  bg-white px-3'> 
    {/* displaying the searched comp from searchbar */}
    {
isSearch && (searchFilter.title!==''||searchFilter.location!=='') &&(
    <>
    <h3 className='text-gray-700 text-xl font-bold'>Your Search</h3>
    <div className='flex mt-1 gap-3'>

  
    <div className=' mb-2  text-gray-800'>
        {
            searchFilter.title && (
                <span className=' inline-flex items-center gap-2 border bg-blue-50 px-3 py-2 border-blue-200 rounded text-[13px]'>{searchFilter.title}
                <img className='mt-1 bg-red-300 px-1 py-1 rounded cursor-pointer' onClick={e=>setsearchFilter(prev=>({...prev,title:''}))} src={assets.cross_icon} alt="" />
                </span>
            )
        }
    </div>
    <div>
        {
            searchFilter.location && (
                <span className='text-[13px] inline-flex items-center gap-2 border bg-red-50 px-3 py-2 border-red-200 rounded'>{searchFilter.location}
                <img className='mt-1 bg-red-300 px-1 py-1 rounded cursor-pointer' onClick={e=>setsearchFilter(prev=>({...prev,location:''}))} src={assets.cross_icon} alt="" />
                
                </span>
            )
        }
    </div>

    </div>
    </>
)
    }
<button onClick={()=>setshow(!show)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
    {show?"close": "Filters"}
</button>

    {/* displaying filters */}

<div className={show?"":"max-lg:hidden"}>
    <h4 className='font-medium py-3'>Filter By Categories</h4>
    <ul className='space-y-3 text-gray-700'>
        {JobCategories.map((item,index)=>(
            <li key={index} className='flex gap-1'>
                <input type="checkbox"

                onChange={()=>CategoryChange(item)}
                checked={filterCategories.includes(item)}
                className='' />
                {item}
            </li>
        ))}
    </ul>
</div>


   {/* displaying location filters */}
   <div className={show?"":"max-lg:hidden"}>
    <h4 className='font-medium py-3'>Filter By Locations</h4>
    <ul className='space-y-3 text-gray-700'>
        {JobLocations.map((item,index)=>(
            <li key={index} className='flex gap-1'>
                <input type="checkbox" 
                onChange={()=>locationChange(item)}
                checked={filterLocation.includes(item)}
                className='' />
                {item}
            </li>
        ))}
    </ul>
</div>

</div>
{/* displaying jobList now */}
<section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
    <h3 className='font-medium text-3xl py-2 ' id='job-list' >Find Latest Job-Posting Here</h3>
    <p className='mb-8'>Find Your desired job from top MNCs</p>
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mr-8'>
{filterJobs.slice((currpage-1)*6,currpage*6).map((job,index)=>(
    <Jobcard key={index} job={job}/>
))}
    </div>
{/*creating pagination */}

{
    filterJobs.length>0 &&(
        <div className='flex items-center justify-center space-x-2 mt-10 text-xl'>
            <a href="#job-list"><img onClick={()=>setcurrpage(Math.max(currpage-1,1))} src={assets.left_arrow_icon} alt="" /></a>
            {Array.from({length:Math.ceil(filterJobs.length/6)}).map((_,index)=>(
                <a key={index} href="#job-list">

                    <button onClick={()=>setcurrpage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md ${currpage===index+1?'bg-red-400 text-white':''}`}>{index+1}</button>
                </a>
            ))}
            <a href="#job-list" ><img src={assets.right_arrow_icon} onClick={()=>setcurrpage(Math.min(currpage+1,Math.ceil(filterJobs.length/6)))} alt="" /></a>
        </div>
    )
}
</section>


    </div>
  )
}

export default JobList

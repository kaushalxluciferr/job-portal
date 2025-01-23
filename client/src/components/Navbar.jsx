import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
function Navbar() {


const navigate=useNavigate()
//check user is login or not. method of ckerk
const {showRecruiterLogin,setshowRecruiterLogin,name,user,setuser,image}=useContext(AppContext)

const handlesubmit=()=>{
  localStorage.setItem('userId',"")
  setuser(false)
}
const userId=localStorage.getItem('userId')

useEffect(()=>{
if(userId)
{
  setuser(true)
}
},[userId])



  return (
    <div className='rounded-[24px] shadow py-4 bg-gradient-to-r from-blue-500 to bg-white'>
     <div className='container px-4 sm:px-8 lg:px-20 mx-auto flex lg:justify-between items-center '>
        <img src={assets.logo} onClick={()=>navigate('/')} className='w-20  lg:w-40 sm:w-24 rounded-md cursor-pointer' alt="" />
        { user?<div className='flex  items-center gap-6 sm:gap-4'>
          <Link to='/application' className='text-sm sm:text-base hover:underline ml-2 lg:ml-0'> Applied Jobs</Link>
          <p className='hidden sm:block'>|</p>
          <p className='hidden sm:block'>Hii,{name}</p>
          <img src={image} className='w-8 h-8 sm:w-14 sm:h-14 rounded-full' alt="user" />
          <button className='text-sm sm:text-base text-white bg-red-400 px-1 py-1 rounded-md font medium' onClick={handlesubmit} >Logout</button>

         
        </div> :<div className='flex gap-4 mr- 10 max-sm:text-xs'>
            <button onClick={()=>setshowRecruiterLogin(true)} className='text-gray-600 ml-4 lg:ml-0'>Recreuiter Login</button>
            <button onClick={e=>navigate('/login')} className='bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full '> Login</button>
        </div>}
        
     </div>
    </div>
  )
}

export default Navbar

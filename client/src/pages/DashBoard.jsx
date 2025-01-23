import React, { useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

function DashBoard() {
     const {companyData}=useContext(AppContext)
     
    const navigate=useNavigate()

    const handlesubmit=()=>{
        localStorage.removeItem('companyToken')
        navigate('/')
    }

  return (
    <div className='min-h-screen'>
    {/* Nav fro recuriter  */}

    <div className='shadow py-4'> 
         <div className='px-5 flex justify-between items-center'>
            <img src={assets.logo} onClick={()=>navigate('/dashboard')} className='max-sm:w-32 cursor-pointer' alt="" />

            {
                companyData&&
                <div className='flex gap-3 items-center'>
                <p className='text-xl mr-10 max-sm:hidden'>Welcome,{companyData.name}</p>
                    <button onClick={()=>handlesubmit()} className='py-1 px-2 bg-red-600 text-white rounded-md '>Logout</button>
                <div className='relative group'>
                    <img src={companyData.image} className='w-10 h-10 border rounded-full' alt="" />
                    
                </div>
            </div>
               
            }
            
         </div>
    </div>
<div className='flex items-start'>
    {/* left->sidebar    right-> */}

    <div className='inline-block min-h-screen border-r-2'>
        <ul className='flex flex-col  items-start pt-4 text-gray-900  '>
            <NavLink className={({isActive})=>`flex  items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive&&'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/add-job'}>
            <img className='min-w-4' src={assets.add_icon} alt="" />
            <p className='max-sm:hidden'>Add Job</p>
             </NavLink>
            <NavLink  className={({isActive})=>`flex  items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive&&'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/manage-jobs'}>
            <img className='min-w-4' src={assets.home_icon} alt="" />
            <p className='max-sm:hidden'>Manage Jobs</p>
             </NavLink>
            <NavLink className={({isActive})=>`flex  items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive&&'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/view-applications'}>
            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
            <p className='max-sm:hidden'>View Applications</p>
             </NavLink>
            
        </ul>
    </div>
<div>
    <Outlet/>
</div>
</div>


    </div>
  )
}

export default DashBoard

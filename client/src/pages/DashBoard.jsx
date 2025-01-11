import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

function DashBoard() {

    const navigate=useNavigate()
  return (
    <div className='min-h-screen'>
    {/* Nav fro recuriter  */}

    <div className='shadow py-4'> 
         <div className='px-5 flex justify-between items-center'>
            <img src={assets.logo} onClick={()=>navigate('/')} className='max-sm:w-32 cursor-pointer' alt="" />
            <div className='flex gap-3 items-center'>
                <p className='max-sm:hidden'>Welcome ,my Man</p>
                <div className='relative group'>
                    <img src={assets.company_icon} className='w-8 border rounded-full' alt="" />
                    <div className='   absolute rounded pt-10 hidden group-hover:block top-0 right-0 z-10  p-4  text-black'>
                        <ul className='bg-gradient-to-r from-red-300 to-blue-400 list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li className='py-1 px-2 cursor-pointer pr-10 border-b'>Logout</li>
                            <li  className='py-1 px-2 cursor-pointer pr-10'>Profile</li>
                        </ul>
                    </div>
                </div>
            </div>
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

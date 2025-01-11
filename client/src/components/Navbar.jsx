import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
function Navbar() {

const {openSignIn}=useClerk()

const navigate=useNavigate()
//check user is login or not. method of ckerk
const {user}=useUser()
const {showRecruiterLogin,setshowRecruiterLogin}=useContext(AppContext)
console.log(showRecruiterLogin);

  return (
    <div className='shadow py-4'>
     <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center '>
        <img src={assets.logo} onClick={()=>navigate('/')} className='max-sm:w-20' alt="" />
        {user? <div className='flex items-center gap-3'>
          <Link to='/application'> Applied Jobs</Link>
          <p>|</p>
          <p className='max-sm:hidden'>Hii,{user.firstName+" " +user.lastName}</p>
          <UserButton/>
        </div> :<div className='flex gap-5 mr- 10 max-sm:text-xs'>
            <button onClick={()=>setshowRecruiterLogin(true)} className='text-gray-600 '>Recreuiter Login</button>
            <button onClick={e=>openSignIn()} className='bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full '> Login</button>
        </div>}
        
     </div>
    </div>
  )
}

export default Navbar

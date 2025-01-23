import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


function UserLogin() {
const [state,setstate]=useState('login')
const {backendUrl}=useContext(AppContext)


const navigate=useNavigate()

const [name,setname]=useState('')
const [password,setpassword]=useState('')
const [email,setemail]=useState('')

const [image,setimage]=useState(false)

const [textSubmit,settextSubmit]=useState(false)


const handlesubmit = async (e) => {
    e.preventDefault();

    if(state==='login')
    {
        const formData = new FormData();
formData.append('email', email);
formData.append('password', password);
        try{
const  response=await axios.post(backendUrl + '/api/v1/login',formData,{headers:{
   'Content-Type': 'application/json'
}})
if(response.data.success)
{
    localStorage.setItem('userId',response.data.userId)
    navigate('/')   
    toast.success("login sucessfully")
}

        }catch(error)
        {
            toast.error(error.message)
        }
    }
  
    if (state === 'signup' && !textSubmit) {
      settextSubmit(true);
      return;
    }
  
    if (state === 'signup' && textSubmit) {
      const formdata = new FormData();
      formdata.append('email', email);
      formdata.append('name', name);
      formdata.append('password', password);
      if (image) {
        formdata.append('image', image);
      } else {
        return toast.error('Select an image');
      }
  
      try {
        const response = await axios.post(backendUrl + `/api/v1/create`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.data.success)
        {
            toast.success("signup sucessfully");
            setstate('login')
            setemail('')
            setpassword('')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong!');
      }
    }
  };
  
useEffect(()=>{
  
    document.body.style.overflow="hidden"
  
 return()=>{ return document.body.style.overflow='unset'
 }
},[])



  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
        <form onSubmit={handlesubmit}  className='relative bg-white p-10 rounded-md'>
            <h1 className='text-xl text-center font-medium'>{state} Page</h1>
               <p className='mt-2 text-sm text-gray-700'>Welcome back please verify yourself to continue</p>

               {
                state==='signup' &&textSubmit  ?<>
                 <div className='flex items-center gap-4 my-10'>
                  <label htmlFor="image" >
<img src={image ? URL.createObjectURL(image): assets.upload_area} alt="" className='w-16 rounded-full' />
<input onChange={e=>setimage(e.target.files[0])} type="file" id='image' hidden />

                  </label>
                  <p className='font-bold text-sm'>Upload Your <br />Profile</p>
                 </div>
                </>:
 <>
 {state!=='login'&&(<div className='border mt-2 px-4 py-2 flex items-center gap-2 rounded-3xl'>
 <img src={assets.person_icon} alt="" />
 <input className='p-1 outline-none font-medium' type="text" placeholder='Enter Your name' value={name} onChange={(e)=>setname(e.target.value)} required   />
 </div>)}
 
 <div className='border mt-2 px-4 py-2 flex items-center gap-2 rounded-3xl'>
  <img src={assets.email_icon} alt="" />
  <input className='p-1 outline-none text-sm font-medium' type="email" placeholder='Enter Email' value={email} onChange={(e)=>setemail(e.target.value)} required />
 </div>
 <div className='border mt-2 px-4 py-2 flex items-center gap-2 rounded-3xl'>
  <img src={assets.lock_icon} alt="" />
  <input className='p-1 outline-none font-medium' type="password" value={password} placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} name="" id="" />
 </div>
 </>
               }
           {state==="login"? <p className='text-sm text-blue-600 font-semibold cursor-pointer mt-4'>Forgot Password?</p>:""}   
               <button type='submit' className='bg-red-500 w-full px-2 py-2 mt-4 rounded-md text-xl text-white'  >{state==='signup' && textSubmit?'signup now': state==='signup'?'next':'Login Now'} </button>
               <p className='text-gray-500 mt-4'>{state==='login'?'Dont have Account':'Already Have account'} <span className='text-red-400 cursor-pointer' onClick={()=>state==='login'? setstate('signup'):setstate('login')} >{state==='login'?"signup":"login "} here</span></p>


               <img onClick={()=>navigate('/')}  src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />
        </form>
      
    </div>
  )
}

export default UserLogin

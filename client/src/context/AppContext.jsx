import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext=createContext()

export const AppContextProvider=(props)=>{

const [searchFilter,setsearchFilter]=useState({
    title:'',
    location:''
})

const [isSearch,setisSearch]=useState(false)
const backendUrl=import.meta.env.VITE_BACKEND_URL


const [jobs,setjobs]=useState([])

const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)

// Function to get all the jobs


const [user,setuser]=useState(false)
const [name,setname]=useState('')
const [email,setemail]=useState('')
const [image,setimage]=useState('')
const [resume,setresume]=useState('')
const [companytoken,setcompanytoken]=useState(null)
const [companyData,setcompanyData]=useState([])
const [userData,setuserData]=useState([])
const [userApplication,setuserApplication]=useState([])


const userId=localStorage.getItem('userId')

const fetchDetail=async()=>{
    try{
        const response=await axios.post(backendUrl+`/api/v1/detail`,{userId})
   if(response.data.success)
   {
const data=response.data.user
setuserData(data)
setuser(true)
setname(data.name)
setemail(data.email)
setimage(data.image)
setresume(data.resume)
}
else{
    toast.error(response.data.message)
}
}
catch(error)
{
    console.log(error.message);
    
}
}


// get user applications data
const fetchApplications=async ()=>{
    const userId=localStorage.getItem('userId')
    try{
const {data}=await axios.get(backendUrl+'/api/v1/application',{params:{
    userId
}})
if(data.success)
{
    console.log(data);
    setuserApplication(data.applications)
}

    }catch(error)
    {
        toast.error(error.message)
    }
}


useEffect(()=>{
    if(userId)
        {
            fetchDetail()
            fetchApplications()
        }
    },[userId])

// fetch the company admin data

const fetchAdmin=async ()=>{
    try{
        
        const {data}=await axios.get(backendUrl+`/api/company/companyy`,{headers:{token:companytoken}})
        
        if(data.success)
            {   
                setcompanyData(data.company)
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
        if(companytoken)
            {
                fetchAdmin()
            }
        },[companytoken])
        


// fetch the posted jobs by company
        const getData=async()=>{
             try{
          const {data}=await axios.get(backendUrl+'/api/jobs')
              if(data.success)
              {
                setjobs(data.jobs)
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
getData()            
  const storedcomptoken=localStorage.getItem('companyToken')
if(storedcomptoken)
{
    setcompanytoken(storedcomptoken)
}
},[])

    const value={
searchFilter,setsearchFilter,isSearch,setisSearch,
jobs,setjobs,showRecruiterLogin,setshowRecruiterLogin,backendUrl,
user,name,email,image,resume,userData,setuser,userApplication,setuserApplication,
setcompanyData,setcompanytoken,companyData,companytoken,fetchDetail  ,fetchApplications,

    }
    return (<AppContext.Provider value={value}>
          {props.children}
    </AppContext.Provider>)
}
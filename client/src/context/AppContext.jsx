import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";


export const AppContext=createContext()

export const AppContextProvider=(props)=>{

const [searchFilter,setsearchFilter]=useState({
    title:'',
    location:''
})

const [isSearch,setisSearch]=useState(false)

const [jobs,setjobs]=useState([])

const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)

// Function to get all the jobs

const getData=async()=>{
    setjobs(jobsData)
}

useEffect(()=>{
getData()
},[])

    const value={
searchFilter,setsearchFilter,isSearch,setisSearch,
jobs,setjobs,showRecruiterLogin,setshowRecruiterLogin
    }
    return (<AppContext.Provider value={value}>
          {props.children}
    </AppContext.Provider>)
}
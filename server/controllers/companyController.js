import {v2 as cloudinary} from 'cloudinary'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Company from "../models/company.js"
import Job from '../models/job.js'
import JobApplication from '../models/jobApplication.js'


// Adding a new company
const registerCompany=async (req,res)=>{
const {name,email,password}=req.body
const imageFile=req.file
if(!name||!email||!password||!imageFile)
{
    return res.status(404).json({
        success:false,
        message:"something is missing"
    })
}

try{
    const exemail=await Company.findOne({email})

    if(exemail)
    {
        return res.status(500).json({
            success:false,
            message:"email exist"
        })
    }

    const hashpass=await bcrypt.hash(password,10)



    const imageUpload=await cloudinary.uploader.upload(imageFile.path)

    const company=await Company.create({
        name,
        email,
        password:hashpass,
        image:imageUpload.secure_url
    })
const token=jwt.sign({_id:company._id},process.env.SECRET)

    return res.status(200).json({
        success:true,
        company:{
            _id:company._id,
            name:company.name,
            email:company.email,
            image:company.image
        }
        ,token
    })
}catch(error)
{
   return res.status(500).json({
    success:false,
    message:error.message
   }) 
}

}

// login
const loginCompany=async(req,res)=>{
const {email,password}=req.body

try{
    const exemail=await Company.findOne({email})

    if(!exemail)
    {
        return res.status(404).json({
            success:false,
            message:"Email Not Found"
        })
    }
    const match=await bcrypt.compare(password,exemail.password)
    if(!match)
    {
        return res.status(500).json({
            success:false,
            message:"password is wrong"
        })
    }
    const token=jwt.sign({_id:exemail._id},process.env.SECRET)
    return res.status(200).json({
        success:true,
        company:{
            _id:exemail._id,
            name:exemail.name,
            email:exemail.email,
            image:exemail.image
        },token
    })

}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}


// company data
const getData=async(req,res)=>{
    try{
    const company=req.company
    return res.status(200).json({
        success:true,
        company
    })
}catch(error)
{
return res.status(500).json({
    success:false,
    message:error.message
})
}
}


// adding new job
const postJob=async(req,res)=>{

const{title,description,location,salary,category,level}=req.body
const id=req.company._id


try{
    const job=new Job({
        title,
        description,
        location,
        salary,
        level,
        category,
        date:Date.now(),
        companyId:id
    })
    await job.save()

    res.status(200).json({
        success:true,
        job
    })

}catch(error)
{
    return res.status(500).json({
        success:false,
        error:error.message
    })
}
}



// get applicatnts 
const getJobApplicants=async (req,res)=>{
try{
const companyId=req.company._id
const applications=await JobApplication.find({companyId})
.populate("userId",'name image resume')
.populate("jobId",'title location category level salary').exec()

return res.status(200).json({
    success:true,
    applications
})
}catch(error)
{
return res.status(500).json({
    success:false,
    message:error.message
})
}
}



// get posted job
const postedJob=async (req,res)=>{
try{
   const companyId=req.company._id;

   const job=await Job.find({companyId})

// counting applicants

const jobsData=await Promise.all(job.map(async(item)=>{
    const applicants=await JobApplication.find({jobId:item._id});
    return {...item.toObject(),applicants:applicants.length}
}))

   return res.status(200).json({
    success:true,
    jobsData
   })
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

// change job application status

const changejobStatus=async (req,res)=>{
const {id,status}=req.body

try{

    await JobApplication.findOneAndUpdate({_id:id},{status})

    return res.status(200).json({
        success:true,
        message:"updated successfully"
    })
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

// change job visisbility

const changeVisibility=async(req,res)=>{
try{
const {id}=req.body
const companyId=req.company._id;
const job=await Job.findById(id)

 if(companyId.toString()==job.companyId)
 {
    job.visisble=!job.visisble
 }
 await job.save()
 return res.status(200).json({
    success:true,
    job 
 })


}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    }
    )
}
}

export {registerCompany,loginCompany,getData,postJob,getJobApplicants,postedJob,changeVisibility,changejobStatus}

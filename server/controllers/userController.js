import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import JobApplication from "../models/jobApplication.js"
import Job from "../models/job.js"


const addUser=async (req,res)=>{
try{
    const {email,name,password}=req.body
    const imageFile=req.file
  
    const exemail=await User.findOne({email})

    if(exemail)
    {
        return res.status(500).json({
            success:false,
            message:"user already exist"
        })
    }

     const hashpass=await bcrypt.hash(password,10);

     const imageUpload= await cloudinary.uploader.upload(imageFile.path)
    
           const user =await User.create({
            name,
            email,
            password:hashpass,
            image:imageUpload.secure_url
           })
await user.save()
           const token= jwt.sign({_id:user._id},process.env.SECRET)
  return res.status(200).json({
    success:true,
    token,
    user
  })


}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}

}

const verifyUser=async (req,res)=>{
    const {email,password}=req.body
console.log(email);

    
    try{
const user=await User.findOne({email})
if(!user)
{
    return res.status(404).json({
        success:false,
        message:"email not found"
    })
}
 
const match=await bcrypt.compare(password,user.password)
if(!match)
{
    return res.status(400).json({
        success:false,
        message:"passowrd not matched"
    })
}
const userId=user._id
return res.status(200).json({
    success:true,
    userId
})
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const userDetail=async (req,res)=>{
    const {userId}=req.body
    try{

const user=await User.findById(userId).select('-password')
if(!user)
{
    return res.status(404).json({
        success:false,
        message:"User Not Found"
    })
}
return res.status(200).json({
    success:true,
    user
})
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// apply for job
const applyForJob=async(req,res)=>{
    const {userId,jobId}=req.body
    
    try{

        // finding applied or not applied previos
        const isApplied=await JobApplication.find({jobId,userId})
        if(isApplied.length>0)
            {
        return res.status(400).json({
            success:false,
            message:"job Already Applied"
        })
      }
// finding which job to apply
      const  jobData=await Job.findById(jobId)
      if(!jobData)
        {
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
        }) 
    }
// Applying job now
    await JobApplication.create({
        userId:userId,
        companyId:jobData.companyId,
        jobId,
        date:Date.now()
    })
    return res.status(200).json({
        success:true,
        message:"Jobs Applied Sucessfully"
    })
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}   
}


//  user applied application
const userJobApplication=async(req,res)=>
{
    try{
        const {userId} =req.query
        
    const applications=await JobApplication.find({userId}).populate('companyId','email image name')
    .populate('jobId','description location title category salary level').exec()
    if(!applications)
    {
        return res.status(500).json({
            success:false,
            message:"Applications Now Found"
        })
    }
    return res.status(200).json({
        success:true,userId,
        applications
    })
    
    
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// update the reume of user
const updateResume=async (req,res)=>{
try{
const {userId}=req.body
const resFile=req.file
const user=await User.findById(userId)

if(resFile)
{
    const resumeUpload=await cloudinary.uploader.upload(resFile.path)
    user.resume=resumeUpload.secure_url
}
await user.save()

return res.status(200).json({
    success:true,
    message:"uploaded sucessfully"
})


}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}




export {addUser,verifyUser,userDetail,applyForJob,userJobApplication,updateResume}
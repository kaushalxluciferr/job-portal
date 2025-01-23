import Job from "../models/job.js"



const getJob=async (req,res)=>{

    try{
        
        const jobs=await Job.find({visisble:true}).populate({path:'companyId',select:'-password'})

        return res.status(200).json({
            success:true,
            jobs
        })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const getSingleJobId=async(req,res)=>{
try{
const {id}=req.params

const job=await Job.findById(id).populate({
    path:'companyId',
    select:'-password'
})
if(!job)
{
    return res.status(404).json({
        success:false,
        message:"No job available"
    })
}
return res.status(200).json({
    success:true,
    job
})


}catch(error)
{
   return res.status(500).json({
success:false,
message:error.message
    })
}
}


export {getJob,getSingleJobId}
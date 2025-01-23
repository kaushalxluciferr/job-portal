import jwt from 'jsonwebtoken'
import Company from '../models/company.js'


export const protectCompany=async(req,res,next)=>{
const token=req.headers.token

if(!token)
{
    return res.status(500).json({
        success:false,
        message:'not authorized'
    })
}
try{
const decoded=jwt.verify(token,process.env.SECRET)
req.company=await Company.findById(decoded._id).select('-password')
next()

}catch(error)
{
return res.status(500).json({
    success:false,
    message:error.message
})
}
}
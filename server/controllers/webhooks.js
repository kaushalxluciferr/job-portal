
import {Webhook} from 'svix'

import User from '../models/user.js'

// API controller function to manage cker user database

export const clerkWebhooks=async (req,res)=>{
try{

// Create a svix instance with clerk webhook secret
const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//verifying header s

await whook.verify(JSON.stringify(req.body),{
    'svix-id':req.headers["svix-id"],
    "svix-timestamp":req.headers["svix-timestamp"],
    "svix-signature":req.headers['svix-signature']
})
// getting data from req body

const {data,type}=req.body
// building switch cases for different event

switch(type)
{
    case "user.created":{
           const userData={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            name:data.first_name +' '+data.last_name,
            image:data.image_url,
            resume:''
           }
           await User.create(userData)
          return res.status(200).json({
            success:true
          })
           break;
    }

    case 'user.updated':{
        const userData={
           
            email:data.email_addresses[0].email_address,
            name:data.first_name +' '+data.last_name,
            image:data.image_url,
            
           }
   await User.findById(data.id,userData)

   return res.status(200).json({
    success:true,
   })
   break;
}

    case 'user.deleted':{
       await User.findByIdAndDelete(data.id)
       return res.status(200).json({
        success:number
       })
       break;
    }
    default:
        break
}

}catch(error)
{
return res.status(500).json({
    success:false,
    message:"Webhooks Error"
})

}
}


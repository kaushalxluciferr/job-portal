import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import mongoConnect from './config/connection.js'
import userRouter from './routes/UserRoute.js'
import connectCloudinary from './config/cloudinary.js'
import companyRouter from './routes/companyRoute.js'
import jobRouter from './routes/jobRoute.js'


const app=express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// connect
await mongoConnect()
await connectCloudinary()

// all the routes  
app.use('/api/v1',userRouter)
app.use('/api/company',companyRouter)
app.use('/api/jobs',jobRouter)


app.get('/',(req,res)=>{
res.send("hey sanamika")
})



app.listen(process.env.PORT,()=>{
    console.log("I Love You❤️❤️");
})
import express from 'express'
import { addUser, applyForJob, updateResume, userDetail, userJobApplication, verifyUser } from '../controllers/userController.js'
import upload from '../config/multer.js'
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRouter=express.Router()


userRouter.post('/create',upload.single('image'),addUser)
userRouter.post('/login',verifyUser)
userRouter.post('/detail',userDetail)
userRouter.post('/apply',applyForJob)
userRouter.get('/application',userJobApplication)
userRouter.post('/update-resume',upload.single('resume'),updateResume)


export default userRouter

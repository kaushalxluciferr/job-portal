import express from 'express'
import { changejobStatus, changeVisibility, getData, getJobApplicants, loginCompany, postedJob, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/auth.js'

const companyRouter=express.Router()

companyRouter.post('/register',upload.single('image'),registerCompany)
companyRouter.post('/login',loginCompany)
companyRouter.get('/companyy',protectCompany,getData)
companyRouter.post('/post-job',protectCompany,postJob)
companyRouter.get('/applicants',protectCompany,getJobApplicants)
companyRouter.get('/list-jobs',protectCompany,postedJob)
companyRouter.post('/change-status',protectCompany,changejobStatus)
companyRouter.post('/change-visibility',protectCompany,changeVisibility)


export default companyRouter
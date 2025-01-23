import express from 'express'
import { getJob, getSingleJobId } from '../controllers/jobController.js'

const jobRouter=express.Router()

jobRouter.get('/',getJob)
jobRouter.get('/:id',getSingleJobId)

export default jobRouter
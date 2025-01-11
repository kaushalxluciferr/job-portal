import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './config/instrument.js'
import * as Sentry from '@sentry/node'




const app=express()



// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
import mongoConnect from './config/connection.js'
import { clerkWebhooks } from './controllers/webhooks.js'

await mongoConnect()

// all the routes  


app.get('/',(req,res)=>{
res.send("hey sanamika")
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  
app.post('/webhooks',clerkWebhooks)

Sentry.setupExpressErrorHandler(app)
app.listen(process.env.PORT,()=>{
    console.log("I Love You❤️❤️");
})
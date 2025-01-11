import mongoose from "mongoose";

const mongoConnect=async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("love you too from DB");
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/jobportal`)
}

export default mongoConnect
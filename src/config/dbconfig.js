const mongoose=require("mongoose")
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI,{
    serverSelectionTimeoutMS:5000
})
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log(`MongoDB connection error:${err}`)
})

module.exports=mongoose;
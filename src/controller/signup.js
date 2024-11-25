const userservice=require("../service/signup")
const User=require('../models/user')

const createuser=async(req,res)=>{
    try{
       const userdata=req.body
       const email=userdata.email
       const existingUser=await User.findOne({email})
       if(existingUser){
          res.json({"message":"email is already existed"})
       }
       const user=await userservice.createuser(userdata)
       res.status(201).json({user:user,"message":"user created successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({"msg":err.message})
    }

}
module.exports={createuser}
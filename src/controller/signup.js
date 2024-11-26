const userService = require("../service/signup")
const User = require('../models/user')

const createUser = async(req,res)=>{
    try{
       const userData = req.body
       const email = userData.email
       const existingUser = await User.findOne({email})
       if(existingUser){
          res.json({message:"email is already existed"})
       }
       const user = await userService.createUser(userdata)
       res.status(201).json({user, message:"user created successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({message:err.message})
    }

}
module.exports = {createUser}
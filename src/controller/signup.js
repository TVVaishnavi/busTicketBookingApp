const userService = require("../service/signup")
const User = require('../models/user')

const createUser = async(req, res)=>{
    try{
       const userData = req.body
       const email = userData.email
       const existingUser = await User.findOne({email})
       if(existingUser){
          res.json({message : "email is already existed"})
       }
       else{
       const user = await userService.createUser(userData)
       res.status(201).json({message : "user created successfully",permisson:true})
       }
    }catch(err){
        console.log(err,' jjj')
        res.status(400).json({message : err.message})
    }

}
module.exports = {createUser}
const jwt=require("jsonwebtoken")
const {secretkey}=require("../config/jwtconfig")

const generateToken=(user)=>{
      const payload={
        id:user._id,
        email:user.email,
        role:user.role
      }
      return jwt.sign(payload,secretkey,{expiresIn:"1h"})
}

module.exports={
    generateToken
}
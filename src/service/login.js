const bcrypt=require("bcrypt")
const User=require("../models/user")
const {generateToken}=require("../utils/jwtutils")
const {verifyToken}=require("../middlewares/auth")

const login=async(email,password)=>{
     try {
        const existingUser=await User.findOne({email})
        if(!existingUser){
            throw new Error("user not founded") 
        }
        const isPasswordVaild=bcrypt.compare(password,existingUser.password)
        if(!isPasswordVaild){
            throw new Error("Invalid Password")
        }
        const token=generateToken(existingUser)
        return token
        
     } catch (error) {
        throw new Error("Invalid credentials")
     }
}
const refreshToken=async(oldToken)=>{
    try {
         const decodedToken=verifyToken(oldToken)
    const User=User.findById(decodedToken._id)
    if(!User){
        throw new error("User not found")
    }
    const newToken=generateToken(User)
    return newToken
    } catch (error) {
        throw new error("Invalid token")
    }
   
}

module.exports={
    login,refreshToken
}
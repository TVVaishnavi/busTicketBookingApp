const bcrypt = require("bcrypt")
const took = require("../utils/jwtutils")
const {verifyToken} = require("../middlewares/auth")
const user = require("../models/user")

const login = async(email, password)=>{
     try {
        const existingUser = await user.findOne({email})
        if(!existingUser){
            throw new Error("user not founded") 
        }
        const isPasswordVaild =await bcrypt.compare(password, existingUser.password)
        if(!isPasswordVaild){
            throw new Error("Invalid Password")
        }
        else{
            const token = await  took.generateToken(existingUser)
            if(existingUser?.role==='admin'){
                return {role:existingUser.role, token:token}
            }
            return {token}
        }
        
        
     } catch (error) {
        throw new Error("Invalid credentials")
     }
}

const refreshToken = async(oldToken)=>{
    try {
        console.log('jkbmj')
        const decodedToken =await verifyToken(oldToken)
        console.log(decodedToken.id)
        const _id=decodedToken.id
        const User =await user.findById(_id)
        if(!User){
            throw new error("User not found")
        }
        
        const newToken =await took.generateToken(User)
        console.log('njknk')
        return newToken
    } catch (error) {
       throw new error("Invalid token")
       
    }
   
}

module.exports = {login, refreshToken}
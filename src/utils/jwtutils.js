const jwt=require('jsonwebtoken')
const {secretKey}=require('../config/jwtconfig')


const generateToken = async(user)=>{
      const payload = {
        id : user._id,
        email : user.email,
        role : user.role
      }
      const token=jwt.sign(payload,secretKey, {expiresIn : "1h"})
      return token
}


module.exports = {generateToken}
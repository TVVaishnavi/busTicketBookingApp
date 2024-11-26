const authService = require("../service/login")

const login = async(req,res)=>{
     try {
        const {email,password} = req.body
        const token = await authService.login(email,password)
        res.json({token})
     } catch (error) {
        res.status(401).json({message:"Invaild credentials"})
     }
}

const refreshToken = async(req,res)=>{
   try {
      //const {token} = req.body
      const newToken = await authService.refreshToken(email,password)
      res.json({newToken})
   } catch (error) {
      res.status(401).json({message:"Invaild is token"})
   }
}
module.exports = {
    login, refreshToken
}
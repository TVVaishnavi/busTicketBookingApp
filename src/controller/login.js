const authservice=require("../service/login")

const login=async(req,res)=>{
     try {
        const {email,password}=req.body
        const token=await authservice.login(email,password)
        res.json({token:token})
     } catch (error) {
        res.status(401).json({msg:"Invaild credentials"})
     }
}

const refreshToken=async(req,res)=>{
   try {
      const {token}=req.body
      const newToken=await authservice.refreshToken(email,password)
      res.json({newToken:newToken})
   } catch (error) {
      res.status(401).json({msg:"Invaild is token"})
   }
}
module.exports={
    login,refreshToken
}
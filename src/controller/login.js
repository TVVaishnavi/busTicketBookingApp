const authService = require("../service/login")

const login = async(req, res)=>{
     try {
        const {email, password} = req.body
        const data = await authService.login(email, password)
        res.json(data)
     } catch (error) {
        res.status(401).json({message : "Invaild credentials"})
     }
}

const refreshToken = async(req, res)=>{
   try {
      const {token} = req.body
      const newToken = await authService.refreshToken(token)
      res.json({token:newToken})
   } catch (error) {
      res.status(401).json({message : "Invaild is token"})
   }
}
module.exports = {login, refreshToken}
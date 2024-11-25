const jwt=require("jsonwebtoken")
const secretkey=require("../config/jwtconfig")


const authenticateToken=async(req,res,next)=>{
    const authHeader=req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({msg:"unauthorized:Missing Token"})

    }
    const [bearer,token]=authHeader.split(" ")
    if(bearer!=="Bearer" || !token){
        return res.status(401).json({msg:"unauthorized:Invalid token format"})
    }
    jwt.verify(token,secretkey.secretkey,(err,user)=>{
        if(err){
            return res.status(403).json({msg:"forbidden:Invalid token"})
        }
        req.user=user;
        next();
    })
}
const verifyToken=(token)=>{
    return jwt.verify(token,secretkey)
}
module.exports={authenticateToken,verifyToken}
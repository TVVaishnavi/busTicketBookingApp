const userService=require("../service/user")

const getUser=async(req,res)=>{
    try {
        const users=await userService.getUser()
        res.json(users)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports={getUser}
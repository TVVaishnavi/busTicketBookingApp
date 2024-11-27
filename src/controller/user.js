const userService = require("../service/user")


const getUser = async(req, res)=>{
    try {
        const users = await userService.getUser()
        res.json(users)
    } catch (error) {
        res.status(500).json({message : error})
    }
}

module.exports = {getUser}
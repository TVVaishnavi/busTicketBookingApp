const User = require("../models/user")


const getUser = async()=>{
    const users = await User.find({})
    return users;
}

module.exports = {getUser}
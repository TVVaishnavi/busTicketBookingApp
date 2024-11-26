const User = require("../models/user")
const bcrypt = require("bcrypt")

const createUser = async(userdata)=>{
    const {name,email,password} = userdata
    const hashpassword = await bcrypt.hash(password,10);
    const createuser = new User({
        name,
        email,
        password:hashpassword,
        role:"customer"
    })

    const saveduser = await createuser.save()
    return saveduser
}

module.exports = {createUser}
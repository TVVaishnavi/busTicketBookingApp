const User = require("../models/user")
const bcrypt = require("bcrypt")

const createUser = async(userdata)=>{
    const {name,email,password} = userdata
    const hashPassword = await bcrypt.hash(password,10);
    const createUser = new User({
        name,
        email,
        password:hashPassword,
        role:"customer"
    })

    const savedUser = await createUser.save()
    return savedUser
}

module.exports = {createUser}
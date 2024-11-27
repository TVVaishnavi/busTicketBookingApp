const User = require("../models/user")
const bcrypt = require("bcrypt")

const createUser = async(userData)=>{
    const {name, email, password} = userData
    const hashPassword = await bcrypt.hash(password, 10);
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
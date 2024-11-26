const User = require("./models/user")
const bcrypt = require("bcrypt")


const createAdminAccount = async()=>{
    const email=process.env.ADMIN_EMAIL
    try {
        const existingadmin = await User.findOne({email})
        if(!existingadmin){
            const newAdmin = new User({
                email,
                name:"Admin",
                password:await bcrypt.hash("admin",10),
                role:"admin"
            })
            await newAdmin.save()
            console.log("Admin account created successfully")
        }else{
            console.log("Admin already exists")
        }
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = createAdminAccount
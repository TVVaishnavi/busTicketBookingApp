const express=require("express")
const cors=require("cors")
const userController=require("../controller/user")
const authMiddleware=require("../middlewares/auth")

const router=express.Router()

router.use(cors())

router.route("/admin/view/user")  // req from admin get all user list
     .get(authMiddleware.authenticateToken,userController.getUser)

module.exports=router
const express=require("express")
const signupcontroller=require("../controller/signup")
const router= express.Router()

router.post("/register",signupcontroller.createuser)

module.exports=router;
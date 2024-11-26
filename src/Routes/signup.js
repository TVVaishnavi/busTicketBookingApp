const express = require("express")
const signUpController = require("../controller/signup")
const router = express.Router()

router.post("/register",signUpController.createUser)

module.exports = router;
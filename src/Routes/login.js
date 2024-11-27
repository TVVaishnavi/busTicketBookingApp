const express = require("express")
const cors = require("cors")
const{login, refreshToken} = require("../controller/login")
const router = express.Router()

router.use(cors())
router.route("^/admin/login$|/user/login").post(login)
router.route("/refresh-token").post(refreshToken)

module.exports = router
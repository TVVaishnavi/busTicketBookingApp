const express=require("express")
const cors=require("cors")
const authMiddleware=require("../middlewares/auth")
const buscontroler= require("../controller/bus")
const ticketcontroller = require("../controller/ticket")

const router=express.Router()

router.use(cors())
      

router.route("/admin/bus/createbus")
   .post(authMiddleware.authenticateToken,buscontroler.createbus)
router.route("/admin/bus/deletebus")
   .delete(authMiddleware.authenticateToken,buscontroler.deletebus)
router.route("/admin/bus/updatebus")
   .put(authMiddleware.authenticateToken,buscontroler.updatebus)

router.route("/user/view/busdetails")
  .get(authMiddleware.authenticateToken,buscontroler.getbusdetails)
router.route("/user/view/searchbus")
  .post(authMiddleware.authenticateToken,buscontroler.searchbus)

router.route("/user/bus/bookticket")
  .post(authMiddleware.authenticateToken,ticketcontroller.bookticket)

router.route("/user/bus/cancel/ticket")
  .post(authMiddleware.authenticateToken,ticketcontroller.canacelticket)

router.route("/user/view/busticket")
  .get(authMiddleware.authenticateToken,ticketcontroller.getticket)
module.exports=router
const express = require("express")
const cors = require("cors")
const authMiddleware = require("../middlewares/auth")
const buscontroler = require("../controller/bus")
const ticketcontroller = require("../controller/ticket")

const router = express.Router()

router.use(cors())
      
router.route("/admin/bus/create-bus")
   .post(authMiddleware.authenticateToken,buscontroler.createbus)
router.route("/admin/bus/delete-bus")
   .delete(authMiddleware.authenticateToken,buscontroler.deletebus)
router.route("/admin/bus/update-bus")
   .put(authMiddleware.authenticateToken,buscontroler.updatebus)

router.route("/user/view/bus-details")
  .get(authMiddleware.authenticateToken,buscontroler.getbusdetails)
router.route("/user/view/search-bus")
  .post(authMiddleware.authenticateToken,buscontroler.searchbus)

router.route("/user/bus/book-ticket")
  .post(authMiddleware.authenticateToken,ticketcontroller.bookticket)

router.route("/user/bus/cancel/ticket")
  .post(authMiddleware.authenticateToken,ticketcontroller.canacelticket)

router.route("/user/view/bus-ticket")
  .get(authMiddleware.authenticateToken,ticketcontroller.getticket)
module.exports = router
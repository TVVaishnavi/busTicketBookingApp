const express = require("express")
const cors = require("cors")
const authMiddleWare = require("../middlewares/auth")
const busControlLer = require("../controller/bus")
const ticketController = require("../controller/ticket")

const router = express.Router()

router.use(cors())
      
router.route("/admin/bus/create-bus")
   .post(authMiddleWare.authenticateToken, busControlLer.createBus)
router.route("/admin/bus/delete-bus")
   .delete(authMiddleWare.authenticateToken, busControlLer.deleteBus)
router.route("/admin/bus/update-bus")
   .put(authMiddleWare.authenticateToken, busControlLer.updateBus)

router.route("/user/view/bus-details")
  .get(authMiddleWare.authenticateToken, busControlLer.getbusdetails)
router.route("/user/view/search-bus")
  .post(authMiddleWare.authenticateToken, busControlLer.searchBus)

router.route("/user/bus/book-ticket")
  .post(authMiddleWare.authenticateToken,ticketController.bookticket)

router.route("/user/bus/cancel/ticket")
  .post(authMiddleWare.authenticateToken,ticketController.canacelTicket)

router.route("/user/view/bus-ticket")
  .get(authMiddleWare.authenticateToken,ticketController.getTicket)

module.exports = router
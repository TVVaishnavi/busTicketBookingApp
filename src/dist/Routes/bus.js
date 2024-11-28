"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const bus_1 = __importDefault(require("../controller/bus"));
const ticket_1 = __importDefault(require("../controller/ticket"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.route("/admin/bus/create-bus")
    .post(auth_1.default.authenticateToken, (req, res, next) => bus_1.default.createBus(req, res, next));
router.route("/admin/bus/delete-bus")
    .delete(auth_1.default.authenticateToken, (req, res, next) => bus_1.default.deleteBus(req, res, next));
router.route("/admin/bus/update-bus")
    .put(auth_1.default.authenticateToken, (req, res, next) => bus_1.default.updateBus(req, res, next));
router.route("/user/view/bus-details")
    .get(auth_1.default.authenticateToken, (req, res, next) => bus_1.default.getBusDetails(req, res, next));
router.route("/user/view/search-bus")
    .post(auth_1.default.authenticateToken, (req, res, next) => bus_1.default.searchBus(req, res, next));
router.route("/user/bus/book-ticket")
    .post(auth_1.default.authenticateToken, (req, res, next) => ticket_1.default.bookTicket(req, res, next));
router.route("/user/bus/cancel/ticket")
    .post(auth_1.default.authenticateToken, (req, res, next) => ticket_1.default.cancelTicket(req, res, next));
router.route("/user/view/bus-ticket")
    .get(auth_1.default.authenticateToken, (req, res, next) => ticket_1.default.getTicket(req, res, next));
exports.default = router;

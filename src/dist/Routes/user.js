"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../controller/user"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.route('/admin/view/user') // req from admin get all user list
    .get(auth_1.default.authenticateToken, (req, res, next) => user_1.default.getUser(req, res, next));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("../controller/login"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.route(/^\/admin\/login$|\/user\/login/).post((req, res) => login_1.default.login(req, res));
router.route('/refresh-token').post((req, res) => login_1.default.refreshToken(req, res));
exports.default = router;

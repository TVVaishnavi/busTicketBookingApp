"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const singup_1 = __importDefault(require("../controller/singup"));
const router = express_1.default.Router();
router.post("/register", (req, res) => singup_1.default.createUser(req, res));
exports.default = router;

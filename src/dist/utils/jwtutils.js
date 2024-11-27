"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtconfig_1 = __importDefault(require("../config/jwtconfig"));
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jsonwebtoken_1.default.sign(payload, jwtconfig_1.default.secretKey, { expiresIn: "1h" });
};
exports.default = { generateToken };

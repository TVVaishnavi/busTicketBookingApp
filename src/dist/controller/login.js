"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../service/login"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield login_1.default.login(email, password);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body; // Assuming email and password are sent in the body
        const newToken = yield login_1.default.refreshToken(email, password);
        res.json({ newToken });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.default = { login, refreshToken };

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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jwtutils_1 = __importDefault(require("../utils/jwtutils"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser) {
            throw new Error("user not founded");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }
        const token = jwtutils_1.default.generateToken(existingUser);
        return token;
    }
    catch (error) {
        throw new Error("Invalid credentials");
    }
});
const refreshToken = (oldToken, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = auth_1.default.verifyToken(oldToken);
        const user = yield user_1.default.findById(decodedToken._id);
        if (!user) {
            throw new Error("User not found");
        }
        const newToken = jwtutils_1.default.generateToken(user);
        return newToken;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
});
exports.default = { login, refreshToken };

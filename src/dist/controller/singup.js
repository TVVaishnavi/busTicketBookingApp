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
const signup_1 = __importDefault(require("../service/signup"));
const user_1 = __importDefault(require("../models/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const email = userData.email;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.json({ message: "email is already existed" });
            return;
        }
        const user = yield signup_1.default.createUser(userData);
        res.status(201).json({ user, message: "user created successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
exports.default = { createUser };

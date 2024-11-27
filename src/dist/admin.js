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
const user_1 = __importDefault(require("./models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdminAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = process.env.ADMIN_EMAIL;
    try {
        const existingAdmin = yield user_1.default.findOne({ email });
        if (!existingAdmin) {
            const newAdmin = new user_1.default({
                email,
                name: "Admin",
                password: yield bcrypt_1.default.hash("admin", 10),
                role: "admin"
            });
            yield newAdmin.save();
            console.log("Admin account created successfully");
        }
        else {
            console.log("Admin already exists");
        }
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.default = createAdminAccount;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoDBUri = process.env.MONGODB_URI;
const options = {
    serverSelectionTimeoutMS: 5000
};
mongoose_1.default.connect(mongoDBUri, options);
mongoose_1.default.connection.on("connected", () => {
    console.log("connected to mongodb");
});
mongoose_1.default.connection.on("error", (err) => {
    console.log(`MongoDB connection error : ${err}`);
});
exports.default = mongoose_1.default;

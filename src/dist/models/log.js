"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const logicSchema = new mongoose_1.Schema({
    dateTime: { type: String, required: true },
    id: { type: String, required: true },
    method: { type: String, required: true },
    origin: { type: String, required: true },
    path: { type: String, required: true }
});
exports.default = dbconfig_1.default.model("logs", logicSchema);

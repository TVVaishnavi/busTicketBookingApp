"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const ticketSchema = new mongoose_1.Schema({
    PNR: { type: String, required: true },
    busNumber: { type: String, required: true },
    seatCount: { type: Number, required: true },
    seatNumber: { type: [String], required: true },
    arrival: { type: String, required: true },
    departure: { type: String, required: true },
    bookingDate: { type: String, required: true },
    date: { type: String, required: true },
    travellerDetails: { type: [mongoose_1.Schema.Types.Mixed], required: true },
    email: { type: String, required: true }
});
exports.default = dbconfig_1.default.model("ticket", ticketSchema);

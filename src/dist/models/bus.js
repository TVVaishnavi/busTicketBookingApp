"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const busSchema = new mongoose_1.Schema({
    busNumber: { type: String, required: true },
    totalSeat: { type: Number, required: true },
    availableSeat: { type: [Number], default: [] },
    bookedSeat: { type: [Number], default: [] },
    inAC: { type: Boolean, default: false },
    arrival: { type: String, required: true },
    departure: { type: String, required: true },
    stoppings: { type: [String], default: [] },
    arriveTime: { type: String, required: true },
    departureTime: { type: String, required: true },
    date: { type: String, required: true }
});
exports.default = dbconfig_1.default.model("buses", busSchema);

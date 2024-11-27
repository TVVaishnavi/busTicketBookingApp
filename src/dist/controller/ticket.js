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
const ticket_1 = __importDefault(require("../service/ticket"));
const bus_1 = __importDefault(require("../models/bus"));
const ticket_2 = __importDefault(require("../models/ticket"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bookTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketDetails = req.body;
        const busNumber = ticketDetails.busNumber;
        const availability = yield bus_1.default.findOne({ busNumber });
        if (availability.availableSeat.length > 0 && ticketDetails.seatCount <= availability.availableSeat.length) {
            const bookedTicket = yield ticket_1.default.bookTicket(ticketDetails, availability.date, availability.availableSeat);
            const update = yield ticket_1.default.updateBusTicket(ticketDetails.seatCount, busNumber);
            res.status(201).json({ ticket: bookedTicket, update, message: "ticket is successfully booked" });
        }
        else {
            res.json({ message: "seats are full" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ err, message: "oops! something wrong" });
    }
});
const cancelTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketDetails = req.body;
        const email = ticketDetails.email;
        const existingTicket = (yield ticket_2.default.findOne({ email })) || null;
        const PNR = existingTicket === null || existingTicket === void 0 ? void 0 : existingTicket.PNR;
        if (existingTicket && PNR === ticketDetails.PNR) {
            const canceledTicket = yield ticket_2.default.findOneAndDelete({ PNR });
            const update = yield ticket_1.default.cancelTicket(ticketDetails);
            res.status(201).json({ ticket: canceledTicket, update, message: "ticket canceled successfully" });
        }
        else {
            res.status(404).json({ message: "ticket not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ err, message: "ticket isn't canceled, something wrong" });
    }
});
const getTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (email === process.env.ADMIN_EMAIL) {
        const allTickets = yield ticket_1.default.getAllTickets();
        res.status(201).json(allTickets);
    }
    else {
        try {
            const userTicket = yield ticket_2.default.findOne({ email });
            if (!userTicket) {
                res.status(404).json({ message: "ticket not found" });
            }
            res.status(201).json(userTicket);
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.default = { bookTicket, cancelTicket, getTicket };

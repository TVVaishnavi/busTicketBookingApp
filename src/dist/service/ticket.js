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
const ticket_1 = __importDefault(require("../models/ticket"));
const bus_1 = __importDefault(require("../models/bus"));
const uuid_1 = require("uuid");
const bus_2 = __importDefault(require("../service/bus"));
const seatArrangements = (seatcount, count) => {
    const seats = [];
    for (let i = 0; i < seatcount; i++) {
        seats.push(count[i]);
    }
    return seats;
};
const removeElements = (set, count) => {
    for (let i = 0; i < count.length; i++) {
        set.delete(count[i]);
    }
    return set;
};
const addElements = (set, count) => {
    for (let i = 0; i < count.length; i++) {
        set.push(count[i]);
    }
    return set;
};
const addSeat = (seat, count) => {
    for (let i = 0; i < count.length; i++) {
        seat.push(count[i]);
    }
    return seat;
};
const removeBookedSeat = (seat, count) => {
    for (let i = 0; i < count.length; i++) {
        const index = seat.indexOf(count[i]);
        if (index > -1) {
            seat.splice(index, 1);
        }
    }
    return seat;
};
const bookTicket = (ticketDetails, date, availableSeat) => __awaiter(void 0, void 0, void 0, function* () {
    const { busNumber, seatCount, arrival, departure, bookingDate, travellerDetails, email } = ticketDetails;
    const PNRid = (0, uuid_1.v1)();
    const bookTicket = new ticket_1.default({
        PNR: PNRid,
        busNumber,
        seatCount,
        seatNumber: seatArrangements(seatCount, availableSeat),
        arrival,
        departure,
        bookingDate,
        date: date,
        travellerDetails,
        email
    });
    const saveTicket = yield bookTicket.save();
    return saveTicket;
});
const updateBusTicket = (count, busNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busDetails = yield bus_1.default.findOne({ busNumber });
        const seatCount = seatArrangements(count.length, busDetails.availableSeat);
        const seatUpdate = {
            availableSeat: Array.from(removeElements(new Set(busDetails.availableSeat), seatCount)).sort((a, b) => a - b),
            bookedSeat: addElements(busDetails.bookedSeat, seatCount).sort((a, b) => a - b)
        };
        const updateBus = bus_2.default.updateBus(seatUpdate, busDetails);
        const bus = yield bus_1.default.findOneAndUpdate({ busNumber }, { $set: updateBus });
        console.log("bus seats are updated", bus);
    }
    catch (err) {
        console.log(err);
    }
});
const cancelTicket = (ticketDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busNumber = ticketDetails.busNumber;
        const busDetails = yield bus_1.default.findOne({ busNumber });
        const seatCount = ticketDetails.seatnumber;
        const seatUpdate = {
            availableSeat: addSeat(busDetails.availableSeat, seatCount).sort((a, b) => a - b),
            bookedSeat: removeBookedSeat(busDetails.bookedSeat, seatCount).sort((a, b) => a - b)
        };
        const updateBus = bus_2.default.updateBus(seatUpdate, busDetails);
        const bus = yield bus_1.default.findOneAndUpdate({ busNumber }, { $set: updateBus });
        console.log("bus seats are updated", bus);
    }
    catch (error) {
    }
});
const getAllTickets = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ticket_1.default.find({});
    return data;
});
exports.default = { bookTicket, updateBusTicket, cancelTicket, getAllTickets };

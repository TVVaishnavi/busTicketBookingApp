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
const bus_1 = __importDefault(require("../models/bus"));
const createBus = (busdata) => __awaiter(void 0, void 0, void 0, function* () {
    const { busNumber, totalSeat, availableSeat, bookedSeat, inAC, arrival, departure, stoppings, arriveTime, departureTime, date } = busdata;
    const newBus = new bus_1.default({
        busNumber,
        totalSeat,
        availableSeat,
        bookedSeat,
        inAC,
        arrival,
        departure,
        stoppings,
        arriveTime,
        departureTime,
        date
    });
    const saveBus = yield newBus.save();
    return saveBus;
});
const updateBus = (newBusData, oldBusData) => {
    const newData = {
        busNumber: newBusData.busNumber || oldBusData.busNumber,
        totalSeat: newBusData.totalSeat || oldBusData.totalSeat,
        availableSeat: newBusData.availableSeat || oldBusData.availableSeat,
        bookedSeat: newBusData.bookedSeat || oldBusData.bookedSeat,
        inAC: newBusData.inAC || oldBusData.inAC,
        arrival: newBusData.arrival || oldBusData.arrival,
        departure: newBusData.departure || oldBusData.departure,
        stoppings: newBusData.stoppings || oldBusData.stoppings,
        arriveTime: newBusData.arriveTime || oldBusData.arriveTime,
        departureTime: newBusData.departureTime || oldBusData.departureTime,
        date: newBusData.date || oldBusData.date
    };
    return newData;
};
const getBusDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield bus_1.default.find({});
    return data;
});
exports.default = { createBus, updateBus, getBusDetails };

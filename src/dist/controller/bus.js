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
const bus_1 = __importDefault(require("../service/bus"));
const bus_2 = __importDefault(require("../models/bus"));
const createBus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busData = req.body;
        const busNumber = busData.busNumber;
        const existingBus = yield bus_2.default.findOne({ busNumber });
        if (existingBus) {
            res.json({ message: "bus already existed" });
        }
        else {
            const bus = yield bus_1.default.createBus(busData);
            res.status(201).json({ bus, message: "bus created successfully" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
const deleteBus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busData = req.body;
        const busNumber = busData.busNumber;
        const existingBus = yield bus_2.default.findOne({ busNumber });
        if (!existingBus) {
            res.json({ message: "bus not found" });
        }
        else {
            const deletedBus = yield bus_2.default.findOneAndDelete({ busNumber });
            res.status(201).json({ bus: deletedBus, message: "bus deleted successfully" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
const updateBus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const busData = req.body;
    const busNumber = busData.busNumber;
    const busExist = yield bus_2.default.findOne({ busNumber });
    console.log(busExist);
    if (!busExist) {
        res.json({ message: "bus not exists" });
    }
    else {
        const newBusData = bus_1.default.updateBus(busData, busExist);
        const bus = yield bus_2.default.findOneAndUpdate({ busNumber }, { $set: newBusData });
        res.status(201).json({ bus, message: "bus Updated" });
    }
});
const getBusDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield bus_1.default.getBusDetails();
    res.status(201).json(data);
});
const searchBus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departure, arrival, date } = req.body;
        const searchBus = yield bus_2.default.find({ arrival, date });
        const filterBus = searchBus.filter((bus) => {
            if (bus.departure === departure) {
                return bus;
            }
        });
        if (filterBus.length) {
            res.status(201).json(filterBus);
        }
        else {
            res.status(404).json({ message: "bus not found" });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = { createBus, deleteBus, updateBus, getBusDetails, searchBus };

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
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const log_1 = __importDefault(require("../models/log"));
const logEvent = (method, origin, path) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = `${(0, date_fns_1.format)(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const createNewLog = new log_1.default({
        dateTime: dateTime,
        id: (0, uuid_1.v4)(),
        method: method,
        origin: origin,
        path: path
    });
    const saveLog = yield createNewLog.save();
    return saveLog;
});
const logEvents = (method, origin, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield logEvent(method, origin, path);
    }
    catch (err) {
        console.log(err);
    }
});
const logger = (req, res, next) => {
    logEvents(req.method, req.headers.origin, req.path);
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.default = { logger };

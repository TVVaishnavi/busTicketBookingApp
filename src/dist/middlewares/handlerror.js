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
const error_1 = __importDefault(require("../models/error"));
const error = (errName, errMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = `${(0, date_fns_1.format)(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const createNewError = new error_1.default({
        dateTime: dateTime,
        id: (0, uuid_1.v4)(),
        errName: errName,
        errMessage: errMessage
    });
    const saveError = yield createNewError.save();
    return saveError;
});
const errEvents = (name, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errEvent = yield error(name, message);
    }
    catch (err) {
        console.log(err);
    }
});
const blocker = (err, req, res, next) => {
    errEvents(err.name, err.message);
    console.log(`${err.name} ${err.message}`);
    next();
};
exports.default = { blocker };

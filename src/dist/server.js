"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const signup_1 = __importDefault(require("./Routes/signup"));
const login_1 = __importDefault(require("./Routes/login"));
const user_1 = __importDefault(require("./Routes/user"));
const bus_1 = __importDefault(require("./Routes/bus"));
const handlelog_1 = __importDefault(require("./middlewares/handlelog"));
const handlerror_1 = __importDefault(require("./middlewares/handlerror"));
const admin_1 = __importDefault(require("./admin"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(handlelog_1.default.logger);
(0, admin_1.default)();
app.use('/', signup_1.default);
app.use('/auth', login_1.default, user_1.default, bus_1.default);
app.use(handlerror_1.default.blocker);
app.listen(PORT, () => {
    console.log('server is running');
});

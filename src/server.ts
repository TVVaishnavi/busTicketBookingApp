import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import signupRouter from './Routes/signup';
import loginRouter from './Routes/login';
import userRouter from './Routes/user';
import busRouter from './Routes/bus';
import  log  from './middlewares/handlelog';
import  block  from './middlewares/handlerror';
import createAdminAccount from './admin';

const app: express.Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(bodyParser.json());
app.use(cors<Request>());
app.use(log.logger);

createAdminAccount();

app.use('/', signupRouter);
app.use('/auth', loginRouter, userRouter, busRouter);

app.use(block.blocker);
app.listen(PORT, (): void => {
    console.log('server is running');
});
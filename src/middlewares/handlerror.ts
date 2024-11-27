import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import  ErrorModel  from '../models/error';
import { NextFunction,Request,Response } from 'express';

interface ErrorParams {
    save(): ErrorParams | PromiseLike<ErrorParams>;
    dateTime:string;
    id:string;
    errName: string;
    errMessage: string;
}

const error = async (errName: string, errMessage: string): Promise<ErrorParams> => {
    const dateTime: string = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const createNewError: ErrorParams = new ErrorModel({
        dateTime: dateTime,
        id: uuid(),
        errName: errName,
        errMessage: errMessage
    });
    const saveError: ErrorParams = await createNewError.save();
    return saveError;
}

const errEvents = async (name: string, message: string): Promise<void> => {
    try {
        const errEvent: ErrorParams = await error(name, message);
    } catch (err) {
        console.log(err);
    }
}

const blocker = (err: Error, req: Request, res: Response, next:NextFunction): void => {
    errEvents(err.name, err.message);
    console.log(`${err.name} ${err.message}`);
    next();
}

export default{ blocker };
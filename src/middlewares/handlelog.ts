import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import log from "../models/log";

interface LogEventParams {
    method: string;
    origin: string;
    path: string;
}

const logEvent = async (method: string, origin: string, path: string): Promise<any> => {
    const dateTime: string = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const createNewLog = new log({
        dateTime: dateTime,
        id: uuid(),
        method: method,
        origin: origin,
        path: path
    });
    const saveLog: any = await createNewLog.save();
    return saveLog;
}

const logEvents = async (method: string, origin: string, path: string): Promise<void> => {
    try {
        await logEvent(method, origin, path);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req: { method: string; headers: { origin: string }; path: string }, res: any, next:any): void => {
    logEvents(req.method, req.headers.origin, req.path);
    console.log(`${req.method} ${req.path}`);
    next();
}

export default{ logger };
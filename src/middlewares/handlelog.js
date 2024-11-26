const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const log = require("../models/log")


const logevent = async(method, origin, path)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const createNewLog=new log({
        datetime:dateTime,
        id:uuid(),
        method:method,
        origin:origin,
        path:path
    })
    const saveLog = await createNewLog.save()
    return saveLog

}
const logEvents = async (method, origin, path) => {
    try {
        const logEvent = await logevent(method, origin, path)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next)=>{
    logEvents(req.method, req.headers.origin, req.path)
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logger}
const buses = require("../models/bus")

const createBus = async(busdata)=>{
     const {busNumber,
        totalSeat,
        avaiableSeat,
        bookedseat,
        inAC,
        arrival,
        departure,
        stopings,
        arivetime,
        departuretime,
        date}=busdata
        const createbus=new buses({
        busNumber,
        totalSeat,
        avaiableSeat,
        bookedseat,
        inAC,
        arrival,
        departure,
        stopings,
        arivetime,
        departuretime,
        date
        })
        const saveBus = await createbus.save()
        return saveBus
}

const updateBus = (newbusdata,oldbusdata)=>{
        const newdata = {
                busNumber:newbusdata.busNumber||oldbusdata.busNumber,
                totalSeat:newbusdata.totalSeat||oldbusdata.totalSeat,
                avaiableSeat:newbusdata.avaiableSeat||oldbusdata.avaiableSeat,
                bookedseat:newbusdata.bookedseat||oldbusdata.bookedseat,
                inAC:newbusdata.inAC||oldbusdata.inAC,
                arrival:newbusdata.arrival||oldbusdata.arrival,
                departure:newbusdata.departure||oldbusdata.departure,
                stopings:newbusdata.stopings||oldbusdata.stopings,
                arivetime:newbusdata.arivetime||oldbusdata.arivetime,
                departuretime:newbusdata.departuretime||oldbusdata.departuretime,
                date:newbusdata.date||oldbusdata.date}
                //console.log(newdata)
        return newdata
}

const getBusDetails = async()=>{
        const data = await buses.find({})
        return data
}



module.exports = {createBus, updateBus, getBusDetails}
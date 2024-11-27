const buses = require("../models/bus")

const createBus = async(busdata)=>{
     const {busNumber,
        totalSeat,
        availableSeat,
        bookedseat,
        inAC,
        arrival,
        departure,
        stoppings,
        arriveTime,
        departureTime,
        date
     }=busdata
        const createBus=new buses({
        busNumber,
        totalSeat,
        availableSeat,
        bookedseat,
        inAC,
        arrival,
        departure,
        stoppings,
        arriveTime,
        departureTime,
        date
        })
        const saveBus = await createBus.save()
        return saveBus
}

const updateBus = (newBusData,oldBusData)=>{
        const newData = {
                busNumber:newBusData.busNumber || oldBusData.busNumber,
                totalSeat:newBusData.totalSeat || oldBusData.totalSeat,
                availableSeat:newBusData.avaiableSeat || oldBusData.avaiableSeat,
                bookedseat:newBusData.bookedseat || oldBusData.bookedseat,
                inAC:newBusData.inAC || oldBusData.inAC,
                arrival:newBusData.arrival || oldBusData.arrival,
                departure:newBusData.departure || oldBusData.departure,
                stoppings:newBusData.stoppings || oldBusData.stoppings,
                arriveTime:newBusData.arriveTime || oldBusData.arriveTime,
                departureTime:newBusData.departureTime || oldBusData.departureTime,
                date:newBusData.date || oldBusData.date
        }
                //console.log(newdata)
        return newData
}

const getBusDetails = async()=>{
        const data = await buses.find({})
        return data
}



module.exports = {createBus, updateBus, getBusDetails}
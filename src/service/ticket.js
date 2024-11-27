const ticket = require("../models/ticket")
const buses = require("../models/bus")
const {v1 : uuidv1} = require('uuid')
const busService = require("../service/bus")


const seatArrangements = (seatCount, count)=>{
    const seats = []
    //console.log(seatcount,count)
    for(i = 0; i<seatCount; i++){
       seats.push(count[i])
    }
    return seats
}

const removeElements = (set, count)=>{
    for(i = 0; i<count.length; i++){
        set.remove(count[i])
    }
    return set
}

const addElements = (set, count)=>{
    for(i = 0; i<count.length; i++){
        set.push(count[i])
    }
    return set
}

const addSeat = (seat, count)=>{
    for(i = 0; i<count.length; i++){
        seat.push(count[i])
    }
    return seat
}

const removeBookedSeat = (seat, count)=>{
    for(i = 0; i<count.length; i++){
        seat.remove(count[i])
    }
    return seat
}

const bookTicket = async(ticketDetails, date, availableSeat)=>{
    const {
        busNumber,
        seatCount,
        arrival,
        departure,
        bookingDate,
        travellerDetails,
        email} = ticketDetails 
    const PNRid = uuidv1() 
    const bookTicket = new ticket({
        PNR : PNRid,
        busNumber,
        seatCount,
        seatNumber : seatArrangements(seatCount, availableSeat),
        arrival,
        departure,
        bookingDate,
        date : date,
        travellerDetails,
        email
    })
    const saveTicket = await bookTicket.save()
    return saveTicket
}

const updateBusTicket = async(count, busNumber)=>{
    try {
        const busDetails = await buses.findOne({busNumber})
        const seatCount = seatArrangements(count, busDetails.availableSeat)
        const seatUpdate = {
            availableSeat : removeElements(busDetails.availableSeat, seatCount).toSorted((a, b) => a - b),
            bookedSeat : addElements(busDetails.bookedSeat, seatCount).toSorted((a, b) => a - b)
        }
        const updateBus = busService.updateBus(seatUpdate, busDetails)
        const bus = await buses.findOneAndUpdate({busNumber}, {$set:updateBus})
        console.log("bus seats are updated", bus)
    } catch (err) {
        console.log(err)
    }
}
const canacelTicket = async(ticketDetails)=>{
    try {
        const busNumber = ticketDetails.busNumber
        const busDetails = await buses.findOne({busNumber})
        const seatCount = ticketDetails.seatnumber
        const seatUpdate = {
            avaiableSeat : addSeat(busDetails.avaiableSeat, seatCount).toSorted((a, b) => a - b),
            bookedSeat : removeBookedSeat(busDetails.bookedseat, seatCount).toSorted((a, b) => a - b)
        }
        const updateBus = busService.updateBus(seatUpdate, busdetails)
        const bus = await buses.findOneAndUpdate({busNumber}, {$set:updateBus})
        console.log("bus seats are updated", bus)
    } catch (error) {
        
    }
}
const getAllTickets = async()=>{
    const data = await ticket.find({})
    return data
}


module.exports = {bookTicket, updateBusTicket, canacelTicket, getAllTickets}
const ticket = require("../models/ticket")
const buses = require("../models/bus")
const {v1 : uuidv1} = require('uuid')
const busService = require("../service/bus")


const seatarrangements = (seatcount,count)=>{
    const seats=[]
    //console.log(seatcount,count)
    for(i=0;i<seatcount;i++){
       seats.push(count[i])
    }
    return seats
}

const removeElemnts = (set,count)=>{
    for(i=0;i<count.length;i++){
        set.remove(count[i])
    }
    return set
}

const addElemnts = (set,count)=>{
    for(i=0;i<count.length;i++){
        set.push(count[i])
    }
    return set
}

const addSeat = (seat,count)=>{
    for(i=0;i<count.length;i++){
        seat.push(count[i])
    }
    return seat
}

const removeBookedSeat = (seat,count)=>{
    for(i=0;i<count.length;i++){
        seat.remove(count[i])
    }
    return seat
}

const bookTicket = async(ticketdetails,date,avaiableSeat)=>{
    const {
        busNumber,
        seatcount,
        arrival,
        departure,
        bookingdate,
        travellerdetails,
        email} = ticketdetails 
    const pnrid = uuidv1() 
    const bookticket = new ticket({
        pnr:pnrid,
        busNumber,
        seatcount,
        seatnumber:seatarrangements(seatcount,avaiableSeat),
        arrival,
        departure,
        bookingdate,
        date:date,
        travellerdetails,
        email
    })
    const saveticket = await bookticket.save()
    return saveticket
}

const updateBusTicket = async(count,busNumber)=>{
    try {
        const busdetails = await buses.findOne({busNumber})
        const seatcount = seatarrangements(count,busdetails.avaiableSeat)
        const seatupdate = {
            avaiableSeat:removeElemnts(busdetails.avaiableSeat,seatcount).toSorted((a, b) => a - b),
            bookedseat:addElemnts(busdetails.bookedseat,seatcount).toSorted((a, b) => a - b)
        }
        const updatebus = busService.updatebus(seatupdate,busdetails)
        const bus = await buses.findOneAndUpdate({busNumber},{$set:updatebus})
        console.log("bus seats are updated",bus)
    } catch (err) {
        console.log(err)
    }
}
const canacelTicket = async(ticketdetails)=>{
    try {
        const busNumber = ticketdetails.busNumber
        const busdetails = await buses.findOne({busNumber})
        const seatCount = ticketdetails.seatnumber
        const seatUpdate = {
            avaiableSeat:addSeat(busdetails.avaiableSeat, seatCount).toSorted((a, b) => a - b),
            bookedseat:removeBookedSeat(busdetails.bookedseat, seatCount).toSorted((a, b) => a - b)
        }
        const updateBus = busService.updateBus(seatUpdate, busdetails)
        const bus = await buses.findOneAndUpdate({busNumber},{$set:updateBus})
        console.log("bus seats are updated",bus)
    } catch (error) {
        
    }
}
const getAllTickets = async()=>{
    const data = await ticket.find({})
    return data
}


module.exports = {bookTicket, updateBusTicket, canacelTicket, getAllTickets}
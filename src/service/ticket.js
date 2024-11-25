const ticket=require("../models/ticket")
const buses=require("../models/bus")
const {v1 : uuidv1} = require('uuid')
const busservice=require("../service/bus")


const seatarrangements=(seatcount,count)=>{
    const seats=[]
    //console.log(seatcount,count)
    for(i=0;i<seatcount;i++){
       seats.push(count[i])
    }
    return seats
}

const removelemnts=(set,count)=>{
    for(i=0;i<count.length;i++){
        set.remove(count[i])
    }
    return set
}

const addelemnts=(set,count)=>{
    for(i=0;i<count.length;i++){
        set.push(count[i])
    }
    return set
}

const addseat=(seat,count)=>{
    for(i=0;i<count.length;i++){
        seat.push(count[i])
    }
    return seat
}

const removebookedseat=(seat,count)=>{
    for(i=0;i<count.length;i++){
        seat.remove(count[i])
    }
    return seat
}

const bookticket=async(ticketdetails,date,avaiableSeat)=>{
    const {
        busNumber,
        seatcount,
        arrival,
        departure,
        bookingdate,
        travellerdetails,
        email}=ticketdetails 
    const pnrid =uuidv1() 
    const bookticket=new ticket({
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
    const saveticket=await bookticket.save()
    return saveticket
}

const updatebusticket=async(count,busNumber)=>{
    try {
        const busdetails=await buses.findOne({busNumber})
        const seatcount=seatarrangements(count,busdetails.avaiableSeat)
        const seatupdate={
            avaiableSeat:removelemnts(busdetails.avaiableSeat,seatcount).toSorted((a, b) => a - b),
            bookedseat:addelemnts(busdetails.bookedseat,seatcount).toSorted((a, b) => a - b)
        }
        const updatebus=busservice.updatebus(seatupdate,busdetails)
        const bus=await buses.findOneAndUpdate({busNumber},{$set:updatebus})
        console.log("bus seats are updated",bus)
    } catch (err) {
        console.log(err)
    }
}
const canacelticket=async(ticketdetails)=>{
    try {
        const busNumber=ticketdetails.busNumber
        const busdetails=await buses.findOne({busNumber})
        const seatcount=ticketdetails.seatnumber
        const seatupdate={
            avaiableSeat:addseat(busdetails.avaiableSeat,seatcount).toSorted((a, b) => a - b),
            bookedseat:removebookedseat(busdetails.bookedseat,seatcount).toSorted((a, b) => a - b)
        }
        const updatebus=busservice.updatebus(seatupdate,busdetails)
        const bus=await buses.findOneAndUpdate({busNumber},{$set:updatebus})
        console.log("bus seats are updated",bus)
    } catch (error) {
        
    }
}
const getalltickets=async()=>{
    const data = await ticket.find({})
    return data
}


module.exports={bookticket,updatebusticket,canacelticket,getalltickets}
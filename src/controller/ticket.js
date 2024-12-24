const ticketService = require("../service/ticket")
const buses = require("../models/bus")
const ticket = require("../models/ticket")

require('dotenv').config()

const bookTicket = async(req, res)=>{
    try {
        const ticketDetails = req.body
        const busNumber = ticketDetails.busNumber
        const availability = await buses.findOne({busNumber})
        let totalAvaSeat;
        if (availability.availableSeat.upper && availability.availableSeat.lower) {
            totalAvaSeat= availability.availableSeat.upper.first.length+availability.availableSeat.upper.second.length+availability.availableSeat.lower.first.length+availability.availableSeat.lower.second.length
            if(totalAvaSeat > 0 && ticketDetails.seatNumbers.length <= totalAvaSeat){
                const ticket = await ticketService.bookTicket(ticketDetails, availability.date, availability.availableSeat)
                const update = await ticketService.updateBusTicket(ticketDetails.seatNumbers, busNumber)
                res.status(201).json({ticket, update, message : "ticket is successfully booked"})
             }else{
                res.json({message : "seat are full"})
             }
        }else if(availability.availableSeat.lower){
            totalAvaSeat=availability.availableSeat.lower.first.length+availability.availableSeat.lower.second.length
            if(totalAvaSeat > 0 && ticketDetails.seatNumbers.length <= totalAvaSeat){
                const ticket = await ticketService.bookTicket(ticketDetails, availability.date, availability.availableSeat)
                const update = await ticketService.updateBusTicket(ticketDetails.seatNumbers, busNumber)
                res.status(201).json({ticket, update, message : "ticket is successfully booked"})
             }else{
                res.json({message : "seat are full"})
             }
        }
        
    } catch (err) {
        console.log(err)
        res.json({err, message : " oops! something wrong"})
    }
    
}

const cancelTicket = async(req, res)=>{
    try {
        const ticketDetails = req.body
        const email = ticketDetails.email
        const existingTicket = await ticket.findOne({email}) || null
        const PNR = existingTicket?.PNR 
         
        if(existingTicket && PNR === ticketDetails.PNR){
            const cancelTicket = await ticket.findOneAndDelete({PNR})
            const update = await ticketService.canacelTicket(ticketDetails)
            res.status(201).json({ticket : cancelTicket, update, message : "ticket canceled successfully"})
        }else{
            res.status(404).json({message : "ticket not found"})
        }
        
    } catch (err) {
        console.log(err)
        res.json({err, message : "ticket isnt canceled,something wrong"})
        
    }
}


const getTicket = async(req, res)=>{
    const {email} = req.user
    //console.log(email)
    const allTicket = await ticketService.getAllTickets()
    if(email === process.env.ADMIN_EMAIL){
        console.log(allTicket)
        res.status(201).json(allTicket)
    }
    else{
    try{
       const filter=allTicket.filter((r)=>{if(r.email===email)return r})
       if(!filter.length){
       res.status(404).json({message : "ticket not found"})
       }
       else{
        res.status(201).json(filter)
       }
    }catch(err){
       console.log(err)
    }
    }
    

}

module.exports={bookTicket, cancelTicket, getTicket}
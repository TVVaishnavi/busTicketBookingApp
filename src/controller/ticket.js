const ticketService = require("../service/ticket")
const buses = require("../models/bus")
const ticket = require("../models/ticket")

const bookTicket = async(req, res)=>{
    try {
        const ticketDetails = req.body
        const busNumber = ticketDetails.busNumber
        const availability = await buses.findOne({busNumber})
        if(availability.availableSeat.length > 0 && ticketDetails.seatCount <= availability.avaiableSeat.length){
           const ticket = await ticketService.bookTicket(ticketDetails, availability.date, availability.avaiableSeat)
           const update = await ticketService.updateBusTicket(ticketDetails.seatCount, busNumber)
           res.status(201).json({ticket, update, message : "ticket is successfully booked"})
        }else{
           res.json({message : "seat are full"})
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
            const update = await ticketService.cancelTicket(ticketDetails)
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
    const {email} = req.body
    if(email === ADMIN_EMAIL){
        const allTicket = await ticketService.getAllTickets()
        res.status(201).json(allTicket)
    }
    else{
    try{
       const usTicket = await ticket.findOne({email})
       if(!usTicket){
       res.status(404).json({message : "ticket not found"})
       }
       res.status(201).json(usTicket)
    }catch(err){
       console.log(err)
    }
    }
    

}

module.exports={bookTicket, cancelTicket, getTicket}
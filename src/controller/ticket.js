const ticketService = require("../service/ticket")
const buses = require("../models/bus")
const ticket = require("../models/ticket")

const bookticket = async(req,res)=>{
    try {
        const ticketDetails = req.body
        const busNumber = ticketDetails.busNumber
        const availability = await buses.findOne({busNumber})
        if(availability.avaiableSeat.length>0 && ticketDetails.seatcount<=availability.avaiableSeat.length){
           const ticket = await ticketService.bookticket(ticketDetails,availability.date,availability.avaiableSeat)
           const update = await ticketService.updatebusticket(ticketDetails.seatcount,busNumber)
           res.status(201).json({ticket:ticket,update:update,"msg":"ticket is successfully booked"})
        }else{
           res.json({"message":"seat are full"})
        }
    } catch (err) {
        console.log(err)
        res.json({err:err,message:" oofhs! something wrong"})
    }
    
}

const canacelTicket = async(req,res)=>{
    try {
        const ticketDetails = req.body
        const email = ticketDetails.email
        const existingticket = await ticket.findOne({email}) || null
        const pnr = existingticket?.pnr 
         
        if(existingticket&&pnr === ticketdetails.pnr){
            const cancelTicket = await ticket.findOneAndDelete({pnr})
            const update = await ticketService.canacelticket(ticketDetails)
            res.status(201).json({ticket:cancelTicket,upadate:update,"message":"ticket canceled successfully"})
        }else{
            res.status(404).json({"message":"ticket not found"})
        }
        
    } catch (err) {
        console.log(err)
        res.json({err:err,message:"ticket isnt canceled,something wrong"})
        
    }
}


const getTicket = async(req,res)=>{
    const {email} = req.body
    if(email === "admin@test.com"){
        const allTicket = await ticketService.getalltickets()
        res.status(201).json(allTicket)
    }
    else{
    try{
       const usTicket = await ticket.findOne({email})
       if(!usTicket){
       res.status(404).json({"msg":"ticket not found"})
       }
       res.status(201).json(usticket)
    }catch(err){
       console.log(err)
    }
    }
    

}

module.exports={bookticket,canacelTicket,getTicket}
const ticketservice=require("../service/ticket")
const buses=require("../models/bus")
const ticket=require("../models/ticket")

const bookticket=async(req,res)=>{
    try {
        const ticketdetails=req.body
        const busNumber=ticketdetails.busNumber
        const availability=await buses.findOne({busNumber})
        if(availability.avaiableSeat.length>0 && ticketdetails.seatcount<=availability.avaiableSeat.length){
           const ticket=await ticketservice.bookticket(ticketdetails,availability.date,availability.avaiableSeat)
           const update=await ticketservice.updatebusticket(ticketdetails.seatcount,busNumber)
           res.status(201).json({ticket:ticket,update:update,"msg":"ticket successfully booked"})
        }else{
           res.json({"msg":"seat are full"})
        }
    } catch (err) {
        console.log(err)
        res.json({err:err,message:" oofhs! something wrong"})
    }
    
}

const canacelticket=async(req,res)=>{
    try {
        const ticketdetails=req.body
        const email=ticketdetails.email
        const existingticket=await ticket.findOne({email}) || null
        const pnr=existingticket?.pnr 
         
        if(existingticket&&pnr===ticketdetails.pnr){
            const cancelticket=await ticket.findOneAndDelete({pnr})
            const update=await ticketservice.canacelticket(ticketdetails)
            res.status(201).json({ticket:cancelticket,upadate:update,"msg":"ticket canceled successfully"})
        }else{
            res.status(404).json({"msg":"ticket not found"})
        }
        
    } catch (err) {
        console.log(err)
        res.json({err:err,message:"ticket isnt canceled,something wrong"})
        
    }
}


const getticket=async(req,res)=>{
    const {email}=req.body
    if(email==="admin@test.com"){
        const allticket=await ticketservice.getalltickets()
        res.status(201).json(allticket)
    }
    else{
    try{
       const usticket=await ticket.findOne({email})
       if(!usticket){
       res.status(404).json({"msg":"ticket not found"})
       }
       res.status(201).json(usticket)
    }catch(err){
       console.log(err)
    }
    }
    

}

module.exports={bookticket,canacelticket,getticket}
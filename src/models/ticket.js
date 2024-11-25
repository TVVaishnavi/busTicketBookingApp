const mongoose=require("../config/dbconfig")

const ticketschema= new mongoose.Schema({
    pnr:String,
    busNumber:String,
    seatcount:Number,
    seatnumber:[],
    arrival:String,
    departure:String,
    bookingdate:String,
    date:String,
    travellerdetails:[],
    email:String
})

module.exports=mongoose.model("ticket",ticketschema)
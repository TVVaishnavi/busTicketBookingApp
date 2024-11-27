const mongoose = require("../config/dbconfig")


const ticketSchema = new mongoose.Schema({
    PNR : String,
    busNumber : String,
    seatCount : Number,
    seatNumber : [],
    arrival : String,
    departure : String,
    bookingDate : String,
    date : String,
    travellerDetails : [],
    email : String
})

module.exports = mongoose.model("ticket", ticketSchema)
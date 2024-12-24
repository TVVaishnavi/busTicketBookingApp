const mongoose = require("../config/dbconfig")


const busSchema = new mongoose.Schema({
    busName : String,
    busNumber : String,
    totalSeat : Number,
    Bustype:String,
    availableSeat : {},
    bookedSeat : [],
    inAC : Boolean,
    arrival : String,
    departure : String,
    stoppings : [String],
    arriveTime : String,
    departureTime : String,
    date : String
})
module.exports = mongoose.model("buses", busSchema)
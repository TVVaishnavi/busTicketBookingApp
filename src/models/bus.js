const mongoose = require("../config/dbconfig")


const busSchema = new mongoose.Schema({
    busNumber:String,
    totalSeat:Number,
    avaiableSeat:[],
    bookedseat:[],
    inAC:Boolean,
    arrival:String,
    departure:String,
    stoppings:[String],
    arriveTime:String,
    departureTime:String,
    date:String
})
module.exports = mongoose.model("buses", busSchema)
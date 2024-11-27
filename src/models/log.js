const { stringify } = require("uuid")
const mongoose = require("../config/dbconfig")


const logicSchema = new mongoose.Schema({
        dateTime : String,
        id : String,
        method : String,
        origin : String,
        path : String
})

module.exports = mongoose.model("logs", logicSchema)
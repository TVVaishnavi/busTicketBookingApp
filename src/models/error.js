const mongoose = require("../config/dbconfig")


const handleErrorSchema = new mongoose.Schema({
        dateTime : String,
        id : String,
        errName : String,
        errMessage : String
})

module.exports = mongoose.model("errorlog", handleErrorSchema)
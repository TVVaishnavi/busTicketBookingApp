const mongoose = require("../config/dbconfig")


const handleErrorSchema = new mongoose.Schema({
        dateTime:String,
        id:String,
        errname:String,
        errmsg:String
})

module.exports = mongoose.model("errorlog", handleErrorSchema)
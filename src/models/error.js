const mongoose = require("../config/dbconfig")


const handlerrorSchema = new mongoose.Schema({
        datetime:String,
        id:String,
        errname:String,
        errmsg:String
})

module.exports = mongoose.model("errorlog", handlerrorSchema)
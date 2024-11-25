const mongoose=require("../config/dbconfig")

const handlerrorschema=new mongoose.Schema({
        datetime:String,
        id:String,
        errname:String,
        errmsg:String
})

module.exports=mongoose.model("errorlog",handlerrorschema)
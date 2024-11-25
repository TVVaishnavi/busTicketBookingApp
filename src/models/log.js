const { stringify } = require("uuid")
const mongoose=require("../config/dbconfig")

const logicschema=new mongoose.Schema({
        datetime:String,
        id:String,
        method:String,
        origin:String,
        path:String
})

module.exports=mongoose.model("logs",logicschema)
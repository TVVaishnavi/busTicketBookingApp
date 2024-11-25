const busservice=require("../service/bus")
const buses=require("../models/bus")
//const bus = require("../models/bus")


const createbus=async(req,res)=>{
     try {
        const busdata=req.body
        const busNumber=busdata.busNumber
        const existingbus=await buses.findOne({busNumber})
       if(existingbus){
          res.json({"message":"bus already existed"})
       }
       else{
         const bus=await busservice.createbus(busdata)
       res.status(201).json({bus:bus,"message":"bus created successfully"})
       }
     } catch (err) {
        console.log(err)
        res.status(400).json({"msg":err.message})
     }
}

const deletebus=async(req,res)=>{
    try {
       const busdata=req.body
       const busNumber=busdata.busNumber
       const existingbus=await buses.findOne({busNumber})
       if(!existingbus){
          res.json({"message":"bus not found"})
       }
       else{
         const deletebus=await buses.findOneAndDelete({busNumber})
         res.status(201).json({bus:deletebus,"message":"bus deleted successfully"})
      }
       
    } catch (err) {
        console.log(err)
        res.status(400).json({"msg":err.message})
    }
}
const updatebus =async(req,res)=>{
   const busdata=req.body
   const busNumber=busdata.busNumber
   const busexist=await buses.findOne({busNumber})
   console.log(busexist)
   if(!busexist){
      res.json({"msg":"bus not exists"})

   }else{
      const newbusdata=busservice.updatebus(busdata,busexist)
      //console.log(newbusdata)
      const bus=await buses.findOneAndUpdate({busNumber},{$set:newbusdata})
      res.status(201).json({bus:bus,"msg":"bus Updated"})
   }
}
const getbusdetails=async(req,res)=>{
      const data=await busservice.getbusdetails()
      res.status(201).json(data) 
}
const searchbus=async(req,res)=>{
   try {
      const {departure,arrival,date}=req.body
      const searchbus=await buses.find({arrival,date})
      const filterbus=searchbus.filter((bus)=>{
         if(bus.departure===departure){
            return bus
         }
      })
      if(filterbus.length){
         res.status(201).json(filterbus)
      }else{
         res.status(404).json({"msg":"bus not found"})
      }
   } catch (err) {
      console.log(err)

   }
}



module.exports={createbus,deletebus,updatebus,getbusdetails,searchbus}
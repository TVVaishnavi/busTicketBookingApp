const busService = require("../service/bus")
const buses = require("../models/bus")
//const bus = require("../models/bus")


const createBus = async(req,res)=>{
     try {
        const busData = req.body
        const busNumber = busData.busNumber
        const existingBus = await buses.findOne({busNumber})
       if(existingBus){
          res.json({message:"bus already existed"})
       }
       else{
         const bus = await busService.createBus(busData)
       res.status(201).json({bus, message:"bus created is successfully"})
       }
     } catch (err) {
        console.log(err)
        res.status(400).json({message:err.message})
     }
}

const deleteBus = async(req,res)=>{
    try {
       const busData = req.body
       const busNumber = busData.busNumber
       const existingBus = await buses.findOne({busNumber})
       if(!existingBus){
          res.json({message:"bus not found"})
       }
       else{
         const deleteBus = await buses.findOneAndDelete({busNumber})
         res.status(201).json({bus:deleteBus, message:"bus deleted successfully"})
      }
       
    } catch (err) {
        console.log(err)
        res.status(400).json({message:err.message})
    }
}
const updateBus = async(req,res)=>{
   const busData = req.body
   const busNumber = busData.busNumber
   const busExist = await buses.findOne({busNumber})
   console.log(busExist)
   if(!busExist){
      res.json({message:"bus not exists"})

   }else{
      const newBusData = busService.updateBus(busData,busExist)
      //console.log(newbusdata)
      const bus = await buses.findOneAndUpdate({busNumber}, {$set:newBusData})
      res.status(201).json({bus, message:"bus Updated"})
   }
}
const getBusDetails = async(req,res)=>{
      const data = await busService.getBusDetails()
      res.status(201).json(data) 
}
const searchBus = async(req,res)=>{
   try {
      const {departure,arrival,date} = req.body
      const searchBus = await buses.find({arrival,date})
      const filterBus = searchBus.filter((bus)=>{
         if(bus.departure === departure){
            return bus
         }
      })
      if(filterBus.length){
         res.status(201).json(filterBus)
      }else{
         res.status(404).json({message:"bus not found"})
      }
   } catch (err) {
      console.log(err)

   }
}



module.exports = {createBus, deleteBus, updateBus, getBusDetails, searchBus}
const ticket = require("../models/ticket")
const buses = require("../models/bus")
const {v1 : uuidv1} = require('uuid')

const busService = require("../service/bus")

const addele=(ava,sele,type)=>{
    for(let i=0;i<sele.length;i++){
        if(type==='Setter'){
          if(sele[i].length===3){
             const [dir,lay,num]=sele[i].split('')
             if(lay==='L'){
                if(dir==='R') {
                  ava.lower.first.push(Number(num)).toSorted((a, b) => a - b)}
                else {
                  ava.lower.second.push(Number(num)).toSorted((a, b) => a - b)}
             }
             else{
              if(dir==='R') {
                      ava.upper.first.push(Number(num)).toSorted((a, b) => a - b)
              }
              else {
                  ava.upper.second.push(Number(num)).toSorted((a, b) => a - b)}
             }
          }
          else{
              const [dir,lay,num1,num2]=sele[i].split('')
              if(lay==='L'){
                  if(dir==='R')  {
                      // console.log(num1+num2)
                      ava.lower.first.push(Number(num1+num2)).toSorted((a, b) => a - b)
                      
                      }
                  else {
                      ava.lower.second.push(Number(num1+num2)).toSorted((a, b) => a - b)
                      
                  }
               }
               else{
                if(dir==='R') {
                  ava.upper.first.push(Number(num1+num2)).toSorted((a, b) => a - b)
                }
                else {
                  ava.upper.second.push(Number(num1+num2)).toSorted((a, b) => a - b)
                  
                }
               }
          }
        }
        else{
          if(sele[i].length===3){
              const [lay,dir,num]=sele[i].split('')
              if(lay==='L'){
                 if(dir==='N') {
                   ava.lower.first.push(Number(num)).toSorted((a, b) => a - b)}
                 else {
                   ava.lower.second.push(Number(num)).toSorted((a, b) => a - b)}
              }
              else{
               if(dir==='S') {
                       ava.upper.first.push(Number(num)).toSorted((a, b) => a - b)
               }
               else {
                   ava.upper.second.push(Number(num)).toSorted((a, b) => a - b)}
              }
           }
           else{
               const [lay,dir,num1,num2]=sele[i].split('')
               if(lay==='L'){
                   if(dir==='N')  {
                       // console.log(num1+num2)
                       ava.lower.first.push(Number(num1+num2)).toSorted((a, b) => a - b)
                       
                       }
                   else {
                       ava.lower.second.push(Number(num1+num2)).toSorted((a, b) => a - b)
                       
                   }
                }
                else{
                 if(dir==='N') {
                   ava.upper.first.push(Number(num1+num2)).toSorted((a, b) => a - b)
                 }
                 else {
                   ava.upper.second.push(Number(num1+num2)).toSorted((a, b) => a - b)
                   
                 }
                }
           }
        }
       }
       return ava
}

const removeele=(ava,sele,type)=>{
    for(let i=0;i<sele.length;i++){
        if(type==='Setter'){
            if(sele[i].length===3){
           const [dir,lay,num]=sele[i].split('')
           if(lay==='L'){
              if(dir==='R') {
                const index=ava.lower.first.indexOf(Number(num))
                ava.lower.first.splice(index,1)}
              else {
                const index=ava.lower.second.indexOf(Number(num))
                ava.lower.second.splice(index,1)}
           }
           else{
            if(dir==='R') {
                    const index=ava.upper.first.indexOf(Number(num))
                    ava.upper.first.splice(index,1)
            }
            else {
                const index=ava.upper.second.indexOf(Number(num))
                ava.upper.second.splice(index,1)}
           }
        }
        else{
            const [dir,lay,num1,num2]=sele[i].split('')
            if(lay==='L'){
                if(dir==='R')  {
                    // console.log(num1+num2)
                    const index=ava.lower.first.indexOf(Number(num1+num2))
                    ava.lower.first.splice(index,1)
                    }
                else {
                    const index=ava.lower.second.indexOf(Number(num1+num2))
                    ava.lower.second.splice(index,1)
                }
             }
             else{
              if(dir==='R') {
                const index=ava.upper.first.indexOf(Number(num1+num2))
                    ava.upper.first.splice(index,1)
              }
              else {
                const index=ava.upper.second.indexOf(Number(num1+num2))
                ava.upper.second.splice(index,1)
              }
             }
        }
        }
        else{
            if(sele[i].length===3){
                const [lay,dir,num]=sele[i].split('')
                if(lay==='L'){
                   if(dir==='N') {
                     const index=ava.lower.first.indexOf(Number(num))
                     ava.lower.first.splice(index,1)}
                   else {
                     const index=ava.lower.second.indexOf(Number(num))
                     ava.lower.second.splice(index,1)}
                }
                else{
                 if(dir==='N') {
                         const index=ava.upper.first.indexOf(Number(num))
                         ava.upper.first.splice(index,1)
                 }
                 else {
                     const index=ava.upper.second.indexOf(Number(num))
                     ava.upper.second.splice(index,1)}
                }
             }
             else{
                 const [lay,dir,num1,num2]=sele[i].split('')
                 if(lay==='L'){
                     if(dir==='N')  {
                         // console.log(num1+num2)
                         const index=ava.lower.first.indexOf(Number(num1+num2))
                         ava.lower.first.splice(index,1)
                         }
                     else {
                         const index=ava.lower.second.indexOf(Number(num1+num2))
                         ava.lower.second.splice(index,1)
                     }
                  }
                  else{
                   if(dir==='N') {
                     const index=ava.upper.first.indexOf(Number(num1+num2))
                         ava.upper.first.splice(index,1)
                   }
                   else {
                     const index=ava.upper.second.indexOf(Number(num1+num2))
                     ava.upper.second.splice(index,1)
                   }
                  }
             }
        }
     }
     return ava
}



const bookTicket = async(ticketDetails, date, availableSeat)=>{
    const {
        busName,
        busNumber,
        seatNumber,
        arrival,
        departure,
        bookingDate,
        travellerDetails,
        email} = ticketDetails 
    const PNRid = uuidv1() 
    console.log(email)
    const bookTicket = new ticket({
        PNR : PNRid,
        busName,
        busNumber,
        seatNumber,
        arrival,
        departure,
        bookingDate,
        date : date,
        travellerDetails,
        email
    })
    const saveTicket = await bookTicket.save()
    return saveTicket
}

const updateBusTicket = async(count, busNumber)=>{
    try {
        const busDetails = await buses.findOne({busNumber})
        const seatCount = count
        const seatUpdate = {
            availableSeat :removeele(busDetails.availableSeat, seatCount),
            bookedSeat : seatCount
        }
        const updateBus = busService.updateBus(seatUpdate, busDetails,busDetails.Bustype)
        const bus = await buses.findOneAndUpdate({busNumber}, {$set:updateBus})
        console.log("bus seats are updated", bus)
    } catch (err) {
        console.log(err)
    }
}
const canacelTicket = async(ticketDetails)=>{
    try {
        const busNumber = ticketDetails.busNumber
        const busDetails = await buses.findOne({busNumber})
        const seatCount = ticketDetails.seatNumber
        const seatUpdate = {
            avaiableSeat : addele(busDetails.availableSeat,seatCount,busDetails.Bustype),
            bookedSeat : busDetails.bookedSeat.filter((w)=>{for(let i=0;i<seatCount.length;i++){
                if(w!==seatCount[i]) return w
            }})
        }
        const updateBus = busService.updateBus(seatUpdate, busdetails)
        const bus = await buses.findOneAndUpdate({busNumber}, {$set:updateBus})
        console.log("bus seats are updated", bus)
    } catch (error) {
        
    }
}
const getAllTickets = async()=>{
    const data = await ticket.find({})
    return data
}


module.exports = {bookTicket, updateBusTicket, canacelTicket, getAllTickets}
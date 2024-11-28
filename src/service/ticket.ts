import ticket from "../models/ticket";
import buses from "../models/bus";
import { v1 as uuidv1 } from 'uuid';
import busService from "../service/bus";

const seatArrangements = (seatcount: number, count: number[]): number[] => {
    const seats: number[] = [];
    for (let i = 0; i < seatcount; i++) {
        seats.push(count[i]);
    }
    return seats;
}

const removeElements = (set: Set<number>, count: number[]): Set<number> => {
    for (let i = 0; i < count.length; i++) {
        set.delete(count[i]);
    }
    return set;
}

const addElements = (set: number[], count: number[]): number[] => {
    for (let i = 0; i < count.length; i++) {
        set.push(count[i]);
    }
    return set;
}

const addSeat = (seat: number[], count: number[]): number[] => {
    for (let i = 0; i < count.length; i++) {
        seat.push(count[i]);
    }
    return seat;
}

const removeBookedSeat = (seat: number[], count: number[]): number[] => {
    for (let i = 0; i < count.length; i++) {
        const index = seat.indexOf(count[i]);
        if (index > -1) {
            seat.splice(index, 1);
        }
    }
    return seat;
}

interface TicketDetails {
    busNumber: string;
    seatCount: number;
    arrival: string;
    departure: string;
    bookingDate: string;
    travellerDetails: any;
    email: string;
    seatnumber: number[];
}

const bookTicket = async (ticketDetails: TicketDetails, date: string, availableSeat: number[]): Promise<any> => {
    const {
        busNumber,
        seatCount,
        arrival,
        departure,
        bookingDate,
        travellerDetails,
        email
    } = ticketDetails;
    const PNRid: string = uuidv1();
    const bookTicket = new ticket({
        PNR: PNRid,
        busNumber,
        seatCount,
        seatNumber: seatArrangements(seatCount, availableSeat),
        arrival,
        departure,
        bookingDate,
        date: date,
        travellerDetails,
        email
    });
    const saveTicket = await bookTicket.save();
    return saveTicket;
}

const updateBusTicket = async (count: number[], busNumber: string): Promise<void> => {
    try {
        const busDetails:any = await buses.findOne({ busNumber });
        const seatCount = seatArrangements(count.length, busDetails.availableSeat);
        const seatUpdate :any= {
            availableSeat: Array.from(removeElements(new Set(busDetails.availableSeat), seatCount)).sort((a, b) => a - b),
            bookedSeat: addElements(busDetails.bookedSeat, seatCount).sort((a, b) => a - b)
        };
        const updateBus = busService.updateBus(seatUpdate, busDetails);
        const bus = await buses.findOneAndUpdate({ busNumber }, { $set: updateBus });
        console.log("bus seats are updated", bus);
    } catch (err) {
        console.log(err);
    }
}

const cancelTicket = async (ticketDetails: TicketDetails): Promise<void> => {
    try {
        const busNumber: string = ticketDetails.busNumber;
        const busDetails:any = await buses.findOne({ busNumber });
        const seatCount: number[] = ticketDetails.seatnumber;
        const seatUpdate:any = {
            availableSeat: addSeat(busDetails.availableSeat, seatCount).sort((a, b) => a - b),
            bookedSeat: removeBookedSeat(busDetails.bookedSeat, seatCount).sort((a, b) => a - b)
        };
        const updateBus = busService.updateBus(seatUpdate, busDetails);
        const bus = await buses.findOneAndUpdate({ busNumber }, { $set: updateBus });
        console.log("bus seats are updated", bus);
    } catch (error) {
        
    }
}

const getAllTickets = async (): Promise<any[]> => {
    const data = await ticket.find({});
    return data;
}

export default{ bookTicket, updateBusTicket, cancelTicket, getAllTickets };
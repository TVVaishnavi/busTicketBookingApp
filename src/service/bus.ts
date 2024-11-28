import buses from "../models/bus";

interface BusData {
    busNumber: string;
    totalSeat: number;
    availableSeat: number;
    bookedSeat: number;
    inAC: boolean;
    arrival: string;
    departure: string;
    stoppings: string[];
    arriveTime: string;
    departureTime: string;
    date: string;
}

const createBus = async (busdata: BusData): Promise<any> => {
    const {
        busNumber,
        totalSeat,
        availableSeat,
        bookedSeat,
        inAC,
        arrival,
        departure,
        stoppings,
        arriveTime,
        departureTime,
        date
    } = busdata;

    const newBus = new buses({
        busNumber,
        totalSeat,
        availableSeat,
        bookedSeat,
        inAC,
        arrival,
        departure,
        stoppings,
        arriveTime,
        departureTime,
        date
    });

    const saveBus = await newBus.save();
    return saveBus;
}

const updateBus = (newBusData: Partial<BusData>, oldBusData: BusData): BusData => {
    const newData: BusData = {
        busNumber: newBusData.busNumber || oldBusData.busNumber,
        totalSeat: newBusData.totalSeat || oldBusData.totalSeat,
        availableSeat: newBusData.availableSeat || oldBusData.availableSeat,
        bookedSeat: newBusData.bookedSeat || oldBusData.bookedSeat,
        inAC: newBusData.inAC || oldBusData.inAC,
        arrival: newBusData.arrival || oldBusData.arrival,
        departure: newBusData.departure || oldBusData.departure,
        stoppings: newBusData.stoppings || oldBusData.stoppings,
        arriveTime: newBusData.arriveTime || oldBusData.arriveTime,
        departureTime: newBusData.departureTime || oldBusData.departureTime,
        date: newBusData.date || oldBusData.date
    };
    return newData;
}

const getBusDetails = async (): Promise<any[]> => {
    const data = await buses.find({});
    return data;
}

export default{ createBus, updateBus, getBusDetails };
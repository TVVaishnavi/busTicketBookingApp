import { Document, Schema } from 'mongoose';
import mongoose from "../config/dbconfig"

interface IBus extends Document {
    busNumber: string;
    totalSeat: number;
    availableSeat: number[];
    bookedSeat: number[];
    inAC: boolean;
    arrival: string;
    departure: string;
    stoppings: string[];
    arriveTime: string;
    departureTime: string;
    date: string;
}

const busSchema: Schema = new Schema({
    busNumber: { type: String, required: true },
    totalSeat: { type: Number, required: true },
    availableSeat: { type: [Number], default: [] },
    bookedSeat: { type: [Number], default: [] },
    inAC: { type: Boolean, default: false },
    arrival: { type: String, required: true },
    departure: { type: String, required: true },
    stoppings: { type: [String], default: [] },
    arriveTime: { type: String, required: true },
    departureTime: { type: String, required: true },
    date: { type: String, required: true }
});

export default mongoose.model<IBus>("buses", busSchema);
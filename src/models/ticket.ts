import { Document, Schema } from 'mongoose';
import mongoose from "../config/dbconfig"

interface Ticket extends Document {
    PNR: string;
    busNumber: string;
    seatCount: number;
    seatNumber: string[];
    arrival: string;
    departure: string;
    bookingDate: string;
    date: string;
    travellerDetails: any[];
    email: string;
}

const ticketSchema: Schema = new Schema({
    PNR: 
    { 
        type: String, 
        required: true 
    },
    busNumber: 
    { 
        type: String, 
        required: true 
    },
    seatCount: 
    { 
        type: Number, 
        required: true 
    },
    seatNumber: 
    
    { 
        type: [String], 
        required: true 
    },
    arrival: 
    { 
        type: String, 
        required: true 
    },
    departure: 
    { 
        type: String, 
        required: true 
    },
    bookingDate: 
    { 
        type: String, 
        required: true 
    },
    date: 
    { 
        type: String, 
        required: true 
    },
    travellerDetails: 
    { 
        type: [Schema.Types.Mixed], 
        required: true 
    },
    email: 
    { 
        type: String, 
        required: true 
    }
    
});

export default mongoose.model<Ticket>("ticket", ticketSchema);
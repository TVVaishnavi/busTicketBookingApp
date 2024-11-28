import { Document, Schema } from 'mongoose';
import mongoose from "../config/dbconfig"

interface IHandleError extends Document {
    dateTime: string;
    id: string;
    errName: string;
    errMessage: string;
}

const handleErrorSchema: Schema<IHandleError> = new Schema({
    dateTime: 
    { 
        type: String, 
        required: true 
    },
    id: 
    { 
        type: String, 
        required: true 
    },
    errName: 
    { 
        type: String, 
        required: true 
    },
    errMessage: 
    { 
        type: String, 
        required: true 
    }
});

export default mongoose.model<IHandleError>("errorlog", handleErrorSchema);
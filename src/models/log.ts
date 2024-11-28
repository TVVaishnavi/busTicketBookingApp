import { Document, Schema } from 'mongoose';
import mongoose from "../config/dbconfig"

interface ILogic extends Document {
  dateTime: string;
  id: string;
  method: string;
  origin: string;
  path: string;
}

const logicSchema: Schema = new Schema({
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
  method: 
  { 
    type: String, 
    required: true 
  },
  origin: 
  { 
    type: String, 
    required: true 
  },
  path: 
  { 
    type: String, 
    required: true 
  }
  
});

export default mongoose.model<ILogic>("logs", logicSchema);
import { Document, Schema } from 'mongoose';
import mongoose from "../config/dbconfig"

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
});

export default mongoose.model<IUser>('user', userSchema);
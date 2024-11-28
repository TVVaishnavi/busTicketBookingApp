import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBUri: any = process.env.MONGODB_URI ;

const options: ConnectOptions = {
    serverSelectionTimeoutMS: 5000
};

mongoose.connect(mongoDBUri, options);

mongoose.connection.on("connected", (): void => {
    console.log("connected to mongodb");
});

mongoose.connection.on("error", (err: Error): void => {
    console.log(`MongoDB connection error : ${err}`);
});

export default mongoose;
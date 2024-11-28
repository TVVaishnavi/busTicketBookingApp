import { Request, Response } from 'express';
import busService from '../service/bus';
import buses from '../models/bus';

interface BusData {
  busNumber: string;
  [key: string]: any;
}

const createBus = async (req: Request, res: Response, next: unknown): Promise<void> => {
  try {
    const busData: any = req.body;
    const busNumber: string = busData.busNumber;
    const existingBus = await buses.findOne({ busNumber });
    if (existingBus) {
      res.json({ message: "bus already existed" });
    } else {
      const bus = await busService.createBus(busData);
      res.status(201).json({ bus, message: "bus created successfully" });
    }
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const deleteBus = async (req: Request, res: Response, next: unknown): Promise<void> => {
  try {
    const busData: BusData = req.body;
    const busNumber: string = busData.busNumber;
    const existingBus = await buses.findOne({ busNumber });
    if (!existingBus) {
      res.json({ message: "bus not found" });
    } else {
      const deletedBus = await buses.findOneAndDelete({ busNumber });
      res.status(201).json({ bus: deletedBus, message: "bus deleted successfully" });
    }
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const updateBus = async (req: Request, res: Response, next: unknown): Promise<void> => {
  const busData: BusData = req.body;
  const busNumber: string = busData.busNumber;
  const busExist:any = await buses.findOne({ busNumber });
  console.log(busExist);
  if (!busExist) {
    res.json({ message: "bus not exists" });
  } else {
    const newBusData = busService.updateBus(busData, busExist);
    const bus = await buses.findOneAndUpdate({ busNumber }, { $set: newBusData });
    res.status(201).json({ bus, message: "bus Updated" });
  }
};

const getBusDetails = async (req: Request, res: Response, next: unknown): Promise<void> => {
  const data = await busService.getBusDetails();
  res.status(201).json(data);
};

const searchBus = async (req: Request, res: Response, next: unknown): Promise<void> => {
  try {
    const { departure, arrival, date }: { departure: string; arrival: string; date: string } = req.body;
    const searchBus = await buses.find({ arrival, date });
    const filterBus = searchBus.filter((bus) => {
      if (bus.departure === departure) {
        return bus;
      }
    });
    if (filterBus.length) {
      res.status(201).json(filterBus);
    } else {
      res.status(404).json({ message: "bus not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export default { createBus, deleteBus, updateBus, getBusDetails, searchBus };
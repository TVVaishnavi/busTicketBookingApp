import { Request, Response } from 'express';
import ticketService from '../service/ticket';
import buses from '../models/bus';
import ticket from '../models/ticket';
import dotenv from 'dotenv';

dotenv.config();


interface TicketDetails {
    busNumber: string;
    seatCount: number;
    email: string;
    PNR: string;
}

const bookTicket = async (req: Request, res: Response, next: unknown): Promise<void> => {
    try {
        const ticketDetails: any = req.body;
        const busNumber: string = ticketDetails.busNumber;
        const availability:any = await buses.findOne({ busNumber });
        if (availability.availableSeat.length > 0 && ticketDetails.seatCount <= availability.availableSeat.length) {
            const bookedTicket = await ticketService.bookTicket(ticketDetails, availability.date, availability.availableSeat);
            const update = await ticketService.updateBusTicket(ticketDetails.seatCount, busNumber);
            res.status(201).json({ ticket: bookedTicket, update, message: "ticket is successfully booked" });
        } else {
            res.json({ message: "seats are full" });
        }
    } catch (err) {
        console.log(err);
        res.json({ err, message: "oops! something wrong" });
    }
}

const cancelTicket = async (req: Request, res: Response, next: unknown): Promise<void> => {
    try {
        const ticketDetails: any= req.body;
        const email: string = ticketDetails.email;
        const existingTicket = await ticket.findOne({ email }) || null;
        const PNR: string | undefined = existingTicket?.PNR;

        if (existingTicket && PNR === ticketDetails.PNR) {
            const canceledTicket = await ticket.findOneAndDelete({ PNR });
            const update = await ticketService.cancelTicket(ticketDetails);
            res.status(201).json({ ticket: canceledTicket, update, message: "ticket canceled successfully" });
        } else {
            res.status(404).json({ message: "ticket not found" });
        }
    } catch (err) {
        console.log(err);
        res.json({ err, message: "ticket isn't canceled, something wrong" });
    }
}

const getTicket = async (req: Request, res: Response, next: unknown): Promise<void> => {
    const { email }: { email: string } = req.body;
    if (email === process.env.ADMIN_EMAIL) {
        const allTickets = await ticketService.getAllTickets();
        res.status(201).json(allTickets);
    } else {
        try {
            const userTicket = await ticket.findOne({ email });
            if (!userTicket) {
                res.status(404).json({ message: "ticket not found" });
            }
            res.status(201).json(userTicket);
        } catch (err) {
            console.log(err);
        }
    }
}

export default { bookTicket, cancelTicket, getTicket };
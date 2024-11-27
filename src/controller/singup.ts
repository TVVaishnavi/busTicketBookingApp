import { Request, Response } from 'express';
import userService from '../service/signup';
import User from '../models/user';

interface UserData {
    email: string;
    [key: string]: any;
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData:any = req.body;
        const email: string = userData.email;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.json({ message: "email is already existed" });
            return;
        }
        const user = await userService.createUser(userData);
        res.status(201).json({ user, message: "user created successfully" });
    } catch (err: any) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

export default { createUser };
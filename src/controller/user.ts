import { Request, Response } from 'express';
import userService from '../service/user';

const getUser = async (req: Request, res: Response, next: unknown): Promise<void> => {
    try {
        const users: any = await userService.getUser();
        res.json(users);
    } catch (error: unknown) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}

export default { getUser };
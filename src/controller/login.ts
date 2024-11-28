import { Request, Response } from 'express';
import authService from '../service/login';

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body;
        const token: string = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body; // Assuming email and password are sent in the body
        const newToken: string = await authService.refreshToken(email, password);
        res.json({ newToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default { login, refreshToken };
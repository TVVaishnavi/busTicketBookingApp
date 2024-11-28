import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtc from '../config/jwtconfig';

const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader: string | undefined = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "unauthorized:Missing Token" });
        return;
    }
    const [bearer, token]: string[] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        res.status(401).json({ message: "unauthorized:Invalid token format" });
        return;
    }
    jwt.verify(token, jwtc.secretKey, (err: Error | null, user: any) => {
        if (err) {
            res.status(403).json({ message: "forbidden:Invalid token" });
            return;
        }
        req.body.user = user;
        next();
    });
};

const verifyToken = (token: string): object | string => {
    return jwt.verify(token, jwtc.secretKey);
};

export default { authenticateToken, verifyToken };
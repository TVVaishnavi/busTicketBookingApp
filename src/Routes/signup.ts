import express, { Request, Response } from 'express';
import signUpController from '../controller/singup';
const router = express.Router();

router.post("/register", (req: Request, res: Response) => signUpController.createUser(req, res));

export default router;
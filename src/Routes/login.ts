import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import ctlogin from '../controller/login';

const router: Router = express.Router();

router.use(cors());

router.route(/^\/admin\/login$|\/user\/login/).post((req: Request, res: Response) => ctlogin.login(req, res));
router.route('/refresh-token').post((req: Request, res: Response) =>ctlogin. refreshToken(req, res));

export default router;
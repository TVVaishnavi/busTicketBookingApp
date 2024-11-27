import express, { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userController from '../controller/user';
import authMiddleware from '../middlewares/auth';

const router: Router = express.Router();
router.use(cors());

router.route('/admin/view/user')  // req from admin get all user list
    .get(authMiddleware.authenticateToken, (req: Request, res: Response, next: NextFunction) => userController.getUser(req, res, next));

export default router;
import express, { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import  authMiddleWare from '../middlewares/auth';
import busControlLer from '../controller/bus';
import ticketController from '../controller/ticket';

const router: Router = express.Router();

router.use(cors());

router.route("/admin/bus/create-bus")
   .post(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => busControlLer.createBus(req, res, next));
router.route("/admin/bus/delete-bus")
   .delete(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => busControlLer.deleteBus(req, res, next));
router.route("/admin/bus/update-bus")
   .put(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => busControlLer.updateBus(req, res, next));

router.route("/user/view/bus-details")
  .get(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => busControlLer.getBusDetails(req, res, next));
router.route("/user/view/search-bus")
  .post(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => busControlLer.searchBus(req, res, next));

router.route("/user/bus/book-ticket")
  .post(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => ticketController.bookTicket(req, res, next));

router.route("/user/bus/cancel/ticket")
  .post(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => ticketController.cancelTicket(req, res, next));

router.route("/user/view/bus-ticket")
  .get(authMiddleWare.authenticateToken, (req: Request, res: Response, next: NextFunction) => ticketController.getTicket(req, res, next));

export default router;
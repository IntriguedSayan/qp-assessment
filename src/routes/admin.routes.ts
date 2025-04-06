import { Router, Request, Response } from "express";
import { GrocceryRepository } from "../repositories/groccery.repository";
import { GrocceryService } from "../services/groccery.service";
import { AdminController } from "../controllers/admin.controller";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validate.middleware";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

const grocceryRepo = new GrocceryRepository();
const grocceryService = new GrocceryService(grocceryRepo);
const adminController = new AdminController(grocceryService);

router.use(authMiddleware, adminAuthMiddleware);

router.post(
  "/groceries",
  [
    body("name").notEmpty(),
    body("price").isFloat({ gt: 0 }),
    body("stock").isInt({ gt: -1 }),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    adminController.addGroccery(req, res);
  }
);

router.get("/groceries", (req: Request, res: Response) => {
  adminController.getGrocceries(req, res);
});

router.patch(
  "/groceries/:id",
  [
    param("id").isString(),
    body("name").optional().notEmpty(),
    body("price").optional().isFloat({ gt: 0 }),
    body("inventory").optional().isInt({ gt: -1 }),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    adminController.updateGroccery(req, res);
  }
);

router.delete(
  "/groceries/:id",
  [param("id").isInt(), validateRequest],
  (req: Request, res: Response) => {
    adminController.removeGroccery(req, res);
  }
);

export default router;

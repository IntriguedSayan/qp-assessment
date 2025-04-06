// src/routes/user.routes.ts
import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate.middleware";
import { GrocceryRepository } from "../repositories/groccery.repository";
import { GrocceryService } from "../services/groccery.service";

const router = Router();

const groceryRepo = new GrocceryRepository();
const groceryService = new GrocceryService(groceryRepo);
const userController = new UserController(groceryService);

router.use(authMiddleware);

router.get("/groceries", (req: Request, res: Response) => {
  userController.viewGrocceries(req, res);
});

router.post(
  "/orders",
  [
    body("items").isArray().withMessage("Items must be an array"),
    body("items.*.groceryId")
      .isString()
      .withMessage("Grocery ID must be a string"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive integer"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    userController.bookOrder(req, res);
  }
);

export default router;

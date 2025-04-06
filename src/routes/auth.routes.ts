import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate.middleware";

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post(
  "/register-user",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  validateRequest,
  (req: Request, res: Response) => {
    authController.register(req, res);
  }
);

router.post(
  "/register-admin",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  validateRequest,
  (req: Request, res: Response) => {
    authController.registerForAdmin(req, res);
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  validateRequest,
  (req: Request, res: Response) => {
    authController.login(req, res);
  }
);

export default router;

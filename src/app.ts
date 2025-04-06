import express, { Application, ErrorRequestHandler } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import "./types";
import { Router, Request, Response } from "express";
class App {
  public app: Application;
  public router: Router;

  constructor() {
    this.app = express();
    this.router = Router();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }
  private initializeMiddlewares() {
    this.app.use(express.json());
  }
  private initializeRoutes() {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Hello world" });
    });
    this.app.use("/api", this.router);
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/admin", adminRoutes);
    this.app.use("/api/user", userRoutes);
  }
  private initializeErrorHandling() {
    this.app.use(errorHandler as ErrorRequestHandler);
  }
}

export default new App().app;

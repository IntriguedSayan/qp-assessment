import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const resp = await this.authService.registerForUser(email, password);
      
      return res.status(resp.status==true?201:400).json({ message: resp.message });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
  async registerForAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const resp = await this.authService.registerForAdmin(email, password);
      return res.status(resp.status==true?201:400).json({ message: resp.message });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      if ("message" in result) {
        return res.status(401).json({ message: result.message });
      }
      return res
        .status(200)
        .json({ message: "Login successful", token: result.token });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}

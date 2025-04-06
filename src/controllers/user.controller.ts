import { Request, Response } from "express";
import { GrocceryService } from "../services/groccery.service";

export class UserController {
  private grocceryService: GrocceryService;

  constructor(grocceryService: GrocceryService) {
    this.grocceryService = grocceryService;
  }

  async viewGrocceries(req: Request, res: Response): Promise<Response> {
    try {
      const groceries = await this.grocceryService.getGroceries();
      return res.status(200).json({ data: groceries });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async bookOrder(req: Request, res: Response): Promise<Response> {
    try {
        const { userId } = req.user!;
        const { items } = req.body;
        await this.grocceryService.bookOrder(userId.toString(), items);
        return res.status(201).json({ message: "Order booked successfully" });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
  }
}

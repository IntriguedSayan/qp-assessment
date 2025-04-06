import { GrocceryService } from "../services/groccery.service";
import { Request, Response } from "express";

export class AdminController {
  private grocceryService: GrocceryService;

  constructor(grocceryService: GrocceryService) {
    this.grocceryService = grocceryService;
  }

  async addGroccery(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, stock } = req.body;
      if (!name || !price || !stock) {
        return res
          .status(400)
          .json({ message: "item name, price & stock is necessary to add" });
      }
      await this.grocceryService.addGroccery({ name, price, stock });
      return res.status(201).json({ message: "Groccery added succefully" });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  async getGrocceries(req: Request, res: Response): Promise<Response> {
    try {
      const grocceries = await this.grocceryService.getGroceries();
      return res.status(200).json({ data: grocceries });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  async updateGroccery(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const groccery = await this.grocceryService.updateGroccery(
        id,
        updatedData
      );
      return res
        .status(201)
        .json({ message: `Groccery updated successfully with id: ${id}` });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  async removeGroccery(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const groccery = await this.grocceryService.removeGroccery(id);
      return res
        .status(202)
        .json({ message: `Groccery deleted successfully with id: ${id}` });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

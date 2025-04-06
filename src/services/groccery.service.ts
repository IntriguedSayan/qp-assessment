import { PrismaClient } from "@prisma/client";
import { GrocceryRepository } from "../repositories/groccery.repository";
import logger from "../utils/logger";

export class GrocceryService {
  private grocceryRepo: GrocceryRepository;
  private prisma: PrismaClient;

  constructor(grocceryRepo: GrocceryRepository) {
    this.grocceryRepo = grocceryRepo;
    this.prisma = new PrismaClient();
  }

  async addGroccery(data: { name: string; price: number; stock: number }) {
    logger.info("Adding new groccery item %s", data.name);
    return this.grocceryRepo.createGroccery(data);
  }

  async getGroceries() {
    return this.grocceryRepo.getAllGroceries();
  }

  async updateGroccery(
    id: string,
    data: Partial<{ name: string; price: number; stock: number }>
  ) {
    return this.grocceryRepo.updateGroccery(id, data);
  }

  async removeGroccery(id: string) {
    return this.grocceryRepo.deleteGroccery(id);
  }

  async bookOrder(userId: string, items: { groceryId: string; quantity: number }[]) {
    return this.prisma.$transaction(async (transaction) => {
      for (const item of items) {
        const groccery = await transaction.grocceryItem.findUnique({
          where: { id: item.groceryId },
        });
        if (!groccery) {
          throw new Error(`Grocery item with ID ${item.groceryId} not found`);
        }
        if (groccery.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${groccery.name}`);
        }
        await transaction.grocceryItem.update({
          where: { id: item.groceryId },
          data: { stock: groccery.stock - item.quantity },
        });
      }
      const order = await transaction.order.create({
        data: {
          userId,
          items: {
            create: items.map((item) => ({
              grocceryId: item.groceryId,
              quantity: item.quantity
            }))
          }
        }
      });
      return order;
    });
  }
}

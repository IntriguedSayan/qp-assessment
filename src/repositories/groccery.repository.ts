import { PrismaClient, GrocceryItem, Prisma } from "@prisma/client";

export class GrocceryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createGroccery(
    data: Prisma.GrocceryItemCreateInput
  ): Promise<GrocceryItem> {
    return this.prisma.grocceryItem.create({ data });
  }
  async getAllGroceries(): Promise<GrocceryItem[]> {
    return this.prisma.grocceryItem.findMany();
  }
  async getGroceryById(id: string): Promise<GrocceryItem | null> {
    return this.prisma.grocceryItem.findUnique({ where: { id } });
  }
  async updateGroccery(
    id: string,
    data: Partial<GrocceryItem>
  ): Promise<GrocceryItem> {
    return this.prisma.grocceryItem.update({
      where: { id },
      data,
    });
  }

  async deleteGroccery(id:string):Promise<GrocceryItem>{
    return this.prisma.grocceryItem.delete({where:{id}});
  }

}

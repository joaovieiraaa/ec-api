import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoriesController {
  static async index(req: any, response: any) {
    try {
      const users = await prisma.user.findMany();
      response.json(users);
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}

export default CategoriesController;

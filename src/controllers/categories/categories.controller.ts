import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoriesController {
  static async index(req: any, response: any) {
    try {
      const data = await prisma.categories.findMany({
        where: {
          parent_id: null,
        },
        include: {
          subcategories: true,
        },
      });

      response.json(data);
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}

export default CategoriesController;

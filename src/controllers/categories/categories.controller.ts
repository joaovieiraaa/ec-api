import { PrismaClient } from "@prisma/client";
import { toArray } from "../../resources/categories/categories";
import { client } from "../../app";

const prisma = new PrismaClient();

class CategoriesController {
  static async index(req: any, response: any) {
    try {
      // await client.flushAll();

      const redisKey = `get-categories-${JSON.stringify(req.query)}`;
      const cache = await client.get(redisKey);

      if (cache) {
        return response.json(JSON.parse(cache));
      }

      const data = await prisma.categories.findMany({
        where: {
          parent_id: null,
        },
        include: {
          subcategories: true,
        },
        orderBy: {
          order: "asc",
        },
      });

      const result = await toArray(data, req.query);

      await client.set(redisKey, JSON.stringify(result));

      response.json(result);
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}

export default CategoriesController;

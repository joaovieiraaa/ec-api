import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ClientsController {
  static async getByToken() {
    let response: any;

    try {
      const data = await prisma.clients.findMany();

      // console.log(req.query.token);
      console.log(data);

      // response.json(data);
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}

// export default ClientsController;

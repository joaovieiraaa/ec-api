import { PrismaClient } from "@prisma/client";
import ClientsController from "../clients/clients.controller";

const prisma = new PrismaClient();

export default class SessionController {
  static async boot(req: any, response: any) {
    try {
      const client = await ClientsController.getByToken();
      response.json(client);
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}

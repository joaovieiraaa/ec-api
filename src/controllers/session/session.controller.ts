import { PrismaClient } from "@prisma/client";
import ClientsController from "../clients/clients.controller";
import CartsController from "../carts/carts.controller";

const prisma = new PrismaClient();

export default class SessionController {
  static async boot(token: string) {
    const response: { client: any; error?: any } = {
      client: null,
    };

    try {
      let client = await ClientsController.getByToken(token);
      if (!client) client = await ClientsController.generate(token);

      await CartsController.boot(client.id);

      response.client = await ClientsController.getByToken(token);
    } catch (error) {
      response.error = error;
    }

    return response;
  }
}

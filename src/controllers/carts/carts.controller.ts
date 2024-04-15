import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CartsController {
  static async boot(clientId: number) {
    let response: any;

    try {
      response = await prisma.carts.findFirst({
        where: {
          client_id: clientId,
          processed: false,
        },
      });

      if (!response) {
        response = await prisma.carts.create({
          data: {
            client_id: clientId,
          },
        });
      }
    } catch (error: any) {
      response = { error: error };
    }

    return response;
  }
}

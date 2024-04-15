import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ClientsController {
  static async getByToken(token: string) {
    let response: any;

    try {
      response = await prisma.clients.findFirst({
        where: {
          token: token,
        },
        include: {
          cart: {
            where: {
              processed: false,
            },
            include: {
              products: {
                include: {
                  data: true,
                },
              },
            },
          },
        },
      });
    } catch (error: any) {
      response = { error: error };
    }

    return response;
  }

  static async generate(token: string) {
    let response: any;

    try {
      response = await prisma.clients.create({
        data: {
          token: token,
        },
      });
    } catch (error: any) {
      response = { error: error };
    }

    return response;
  }
}

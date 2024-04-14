import express from "express";
import SessionController from "../../controllers/session/session.controller";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req: Request, res: any) => {
  // SessionController.boot(req, res);
  // res.send(`GET request to /session`);

  const data = await prisma.clients.findFirst({
    where: {
      token: "sWOrIJHuZ4p0kSEiFgihAnhKetibJlEplHjbGk1e",
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
  res.send(data);
});
export default router;

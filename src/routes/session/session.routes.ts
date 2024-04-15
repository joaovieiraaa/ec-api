import express from "express";
import SessionController from "../../controllers/session/session.controller";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req: any, res: any) => {
  const data = await SessionController.boot(req.header("_"));

  res.send(data);
});

export default router;

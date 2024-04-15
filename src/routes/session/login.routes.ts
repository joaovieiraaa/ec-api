import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = "J5$2pE9GcXvRtYqWu7@N3#mH6*F8^D!sL";

export const router = express.Router();

router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

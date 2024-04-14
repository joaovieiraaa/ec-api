import express from "express";
import categoriesRouter from "./categories/categories.routes";
import sessionRouter from "./session/session.routes";

const router = express.Router();

router.use("/categories", categoriesRouter);
router.use("/session", sessionRouter);

export default router;

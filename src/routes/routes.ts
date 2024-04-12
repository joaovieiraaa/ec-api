import express from "express";
import categoriesRouter from "./categories/categories.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("");
});

router.use("/categories", categoriesRouter);

export default router;

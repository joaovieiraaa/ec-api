import express from "express";
import CategoriesController from "../../controllers/categories/categories.controller";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  CategoriesController.index(req, res);
});

router.post("/", (req, res) => {
  res.send("POST request to /users");
});

router.put("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`PUT request to /users/${userId}`);
});

router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`DELETE request to /users/${userId}`);
});

export default router;

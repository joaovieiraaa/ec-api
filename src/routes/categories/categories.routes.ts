import express from "express";
import CategoriesController from "../../controllers/categories/categories.controller";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await CategoriesController.index(req, res);
  } catch (err) {
    next(err);
  }
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

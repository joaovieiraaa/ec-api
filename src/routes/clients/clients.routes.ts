import express from "express";
import ClientsController from "../../controllers/clients/clients.controller";

const router = express.Router();

// router.get("/", (req: any, res: any) => {
//   ClientsController.index(req, res);
// });

// router.post("/", (req, res) => {
//   res.send("POST request to /users");
// });

router.put("/:token", (req: Request, res: any) => {
  ClientsController.getByToken(req, res);
  //   res.send(`PUT request to /users/${userId}`);
});

// router.delete("/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send(`DELETE request to /users/${userId}`);
// });

export default router;

import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import router from "./routes/routes";

// const env = dotenv.config();
const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 100, // Max requests per minute
  message: "Too many requests.",
});

app.use(limiter).use(cors()).use("/v1", router).listen(port);

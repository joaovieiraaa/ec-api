import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";

const env = dotenv.config();
const app = express();
const port = 3000;

app.use(cors()).use("/v1", router).listen(port);

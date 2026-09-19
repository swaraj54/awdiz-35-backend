import express from "express";
import mainRouter from "./routes/mainRouter.js";
import { errorHandler } from "./middlewares/errorMiddlewares.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const app = express();

app.use(express.json());
dotenv.config();
// console.log(process.env.MONGODBURL,"process.env.MONGODBURL")

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api", mainRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import express from "express";
import mainRouter from "./routes/mainRouter.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api", mainRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

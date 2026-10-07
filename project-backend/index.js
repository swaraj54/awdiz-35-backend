import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import morgan from "morgan";
import MainRouter from "./routes/index.js";


const app = express();
dotenv.config();
app.use(express.json())
const corsConfig = { origin : "http://localhost:5173", credentials : true}
app.use(cors(corsConfig))
app.use(morgan('combined'))

app.get("/", (req, res) => {
  res.send("Hello from backend.");
});

app.use("/api", MainRouter)

mongoose.connect(process.env.MONGODBURL).then(()=>{
  console.log("Database connected.")
})

app.listen(8000, () => console.log("server is running on port 8000."));

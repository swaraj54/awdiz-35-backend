import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("All users retrieved successfully");
});

userRouter.post("/", (req, res) => {
  res.send("User created successfully");
});

export default userRouter;

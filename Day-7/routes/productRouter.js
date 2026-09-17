import { Router } from "express";

const productRouter = Router();

productRouter.post("/", (req, res) => {
  res.send("Product created successfully");
});

productRouter.get("/", (req, res) => {
  res.send("All products retrieved successfully");
});

export default productRouter;

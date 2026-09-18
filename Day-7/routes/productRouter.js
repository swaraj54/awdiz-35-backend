import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productControllers.js";

const productRouter = Router();

productRouter.post("/", createProduct);

productRouter.get("/", getAllProducts);

export default productRouter;

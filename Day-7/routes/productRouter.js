import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  operators,
  aggregationPipeline
} from "../controllers/productControllers.js";

const productRouter = Router();

productRouter.post("/", createProduct);

productRouter.get("/", getAllProducts);


productRouter.get("/operators", operators);


productRouter.get("/aggregation-pipeline", aggregationPipeline)

export default productRouter;

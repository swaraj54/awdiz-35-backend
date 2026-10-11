import { Router } from "express";
import {getProducts,createProduct } from "../controllers/seller.controllers.js";

const SellerRouter = Router();

SellerRouter.get("/get-products", getProducts)

SellerRouter.post("/create-product",createProduct)

export default SellerRouter;
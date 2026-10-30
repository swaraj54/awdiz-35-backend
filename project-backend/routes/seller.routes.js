import { Router } from "express";
import {getProducts,createProduct, getOrders } from "../controllers/seller.controllers.js";

const SellerRouter = Router();

SellerRouter.get("/get-products", getProducts)

SellerRouter.post("/create-product",createProduct)

SellerRouter.get("/get-orders", getOrders);

export default SellerRouter;
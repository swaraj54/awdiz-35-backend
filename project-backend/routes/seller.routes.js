import { Router } from "express";
import { getProducts, createProduct, getOrders, changePaymentStatus, changeDeliveryStatus, getDashboardData } from "../controllers/seller.controllers.js";

const SellerRouter = Router();

SellerRouter.get("/get-products", getProducts)

SellerRouter.post("/create-product", createProduct)

SellerRouter.get("/get-orders", getOrders);

SellerRouter.put("/change-payment-status", changePaymentStatus);

SellerRouter.put("/change-delivery-status", changeDeliveryStatus);

SellerRouter.get("/get-dashboard-data", getDashboardData);
export default SellerRouter;
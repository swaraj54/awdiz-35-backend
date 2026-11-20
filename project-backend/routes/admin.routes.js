import { Router } from "express";
import { getDashboardData, getAllOrderDetails, getAllSellers, getAllUsers, approveSeller, getAllProducts, approveProduct } from "../controllers/admin.controllers.js";

const AdminRouter = Router();

AdminRouter.get("/get-all-sellers", getAllSellers)

AdminRouter.get("/get-all-users", getAllUsers)

AdminRouter.post("/approve-seller", approveSeller)


AdminRouter.get("/get-all-products", getAllProducts)

AdminRouter.post("/approve-product", approveProduct)


AdminRouter.get("/get-all-order-details", getAllOrderDetails)

AdminRouter.get("/get-dashboard-data", getDashboardData)

export default AdminRouter;
import { Router } from "express";
import { getAllSellers, getAllUsers, approveSeller } from "../controllers/admin.controllers.js";

const AdminRouter = Router();

AdminRouter.get("/get-all-sellers", getAllSellers)

AdminRouter.get("/get-all-users", getAllUsers)

AdminRouter.post("/approve-seller",approveSeller)

export default AdminRouter;
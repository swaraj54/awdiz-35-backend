import { Router } from "express";
import { getUserProfile, getAllProducts } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.get("/profile", getUserProfile)

UserRouter.get("/products",getAllProducts)

export default UserRouter;
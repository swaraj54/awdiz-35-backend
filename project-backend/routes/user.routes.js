import { Router } from "express";
import { getUserProfile, getAllProducts, getProductDetails, addToCart, getCartProducts } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.get("/profile", getUserProfile)

UserRouter.get("/products",getAllProducts)

UserRouter.get("/product-details/:productId", getProductDetails)

UserRouter.get("/add-to-cart/:productId", addToCart)


UserRouter.get("/get-cart-products", getCartProducts)

export default UserRouter;
import { Router } from "express";
import { getUserProfile, getAllProducts, getProductDetails, addToCart, getCartProducts, createAddress, getAddress, placeOrder } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.get("/profile", getUserProfile)

UserRouter.get("/products",getAllProducts)

UserRouter.get("/product-details/:productId", getProductDetails)

UserRouter.get("/add-to-cart/:productId", addToCart)

UserRouter.get("/get-cart-products", getCartProducts)

UserRouter.post("/create-address", createAddress)

UserRouter.get("/get-addresses", getAddress)


UserRouter.get("/place-order", placeOrder)

export default UserRouter;
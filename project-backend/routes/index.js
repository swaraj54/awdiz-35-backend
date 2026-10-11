import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import AdminRouter from "./admin.routes.js";
import { roleValidator, tokenDecoder } from "../middlewares/authMiddlewares.js";
import SellerRouter from "./seller.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/admin", tokenDecoder, roleValidator("admin"), AdminRouter);

MainRouter.use("/seller", tokenDecoder, roleValidator("seller"), SellerRouter);

export default MainRouter;

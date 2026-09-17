import { Router } from "express";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";

const mainRouter = Router();

mainRouter.use("/product", productRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/admin", adminRouter);

export default mainRouter;

// localhost:3000/api/product  post - create prduct
// localhost:3000/api/users get - get all users

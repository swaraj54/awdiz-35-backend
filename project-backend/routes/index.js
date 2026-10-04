import { Router } from "express";
import AuthRouter from "./auth.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);

export default MainRouter;

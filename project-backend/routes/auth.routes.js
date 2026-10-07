import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controllers.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerController)

AuthRouter.post("/login", loginController)


export default AuthRouter;
import { Router } from "express";
import { deleteAccount, registerController, loginController, getCurrentUser, logoutController } from "../controllers/auth.controllers.js";
import { tokenDecoder } from "../middlewares/authMiddlewares.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerController)

AuthRouter.post("/login", loginController)

AuthRouter.get("/get-current-user", tokenDecoder, getCurrentUser)

AuthRouter.get("/logout", logoutController)


AuthRouter.delete("/delete-account", tokenDecoder, deleteAccount)


export default AuthRouter;
import { Router } from "express";
import { register, login, logout, current } from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);

export default authRouter;
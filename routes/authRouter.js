import { Router } from "express";
import upload from "../middlewares/upload.js";
import auth from "../middlewares/auth.js";
import { register, login, logout, current, updateAvatar } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

export default authRouter;
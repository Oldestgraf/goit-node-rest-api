import { Router } from "express";
import upload from "../middlewares/upload.js";
import auth from "../middlewares/auth.js";
import {
    register,
    login,
    logout,
    current,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", resendVerifyEmail);

export default authRouter;
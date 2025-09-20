import {
    isEmailInUse,
    registerUser,
    validateUserCredentials,
    createToken,
    setUserToken,
    getUserById,
    clearToken,
    toPublicUser,
    updateUserAvatar,
    verifyUserByToken,
    resendVerification,
    sendVerificationEmail,
} from "../services/authServices.js";

import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

export const register = async (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const { email, password } = req.body;

        const exists = await isEmailInUse(email);
        if (exists) return res.status(409).json({ message: "Email in use" });

        const user = await registerUser({ email, password });

        await sendVerificationEmail(user.email, user.verificationToken);

        return res.status(201).json({ user: toPublicUser(user) });
    } catch (e) {
        next(e);
    }
};

export const login = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const { email, password } = req.body;

        const user = await validateUserCredentials(email, password);
        if (!user) return res.status(401).json({ message: "Email or password is wrong" });

        if (!user.verify) {
            return res.status(401).json({ message: "Email is not verified" })
        }

        const token = createToken(user.id);
        await setUserToken(user.id, token);

        return res.status(200).json({
            token,
            user: toPublicUser(user),
        });
    } catch (e) {
        next(e);
    }
};

export const current = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);
        if (!user) return res.status(401).json({ message: "Not authorized" });

        return res.status(200).json({ user: toPublicUser(user) });
    } catch (e) {
        next(e);
    }
};

export const logout = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);
        if (!user) return res.status(401).json({ message: "Not authorized" });

        await clearToken(user.id);
        return res.status(204).send();
    } catch (e) {
        next(e);
    }
};

export const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Avatar file is required" });
        }
        const { path: tempPath, originalname } = req.file;
        const avatarURL = await updateUserAvatar(req.user.id, tempPath, originalname);
        if (!avatarURL) return res.status(401).json({ message: "Not authorized" });

        return res.status(200).json({ avatarURL });
    } catch (e) { next(e); }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await verifyUserByToken(verificationToken);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "Verification successful" });
    } catch (e) {
        next(e);
    }
};

export const resendVerifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body || {};
        if (!email) {
            return res.status(400).json({ message: "missing required field email" });
        }

        const result = await resendVerification(email);
        if (result.status === "not_found") {
            return res.status(404).json({ message: "User not found" });
        }
        if (result.status === "already_verified") {
            return res.status(400).json({ message: "Verification has already been passed" });
        }

        return res.status(200).json({ message: "Verification email sent" });
    } catch (e) {
        if (e.isJoi) return res.status(400).json({ message: e.message });
        next(e);
    }
};

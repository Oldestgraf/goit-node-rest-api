import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/user.js";

export const isEmailInUse = async (email) => {
  const exists = await User.findOne({ where: { email } });
  return Boolean(exists);
};

export const registerUser = async ({ email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  return user;
};

export const validateUserCredentials = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return user;
};

export const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "1d" }
  );
};

export const setUserToken = async (userId, token) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  await user.update({ token });
  return user;
};

export const getUserById = (id) => User.findByPk(id);

export const clearToken = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  await user.update({ token: null });
  return user;
};

export const toPublicUser = (user) => ({
  email: user.email,
  subscription: user.subscription,
});

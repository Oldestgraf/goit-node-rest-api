import jwt from "jsonwebtoken";
import User from "../db/user.js";

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findByPk(payload.id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = { id: user.id, email: user.email, subscription: user.subscription };
    req.token = token;
    next();
  } catch (e) {
    next(e);
  }
};

export default auth;

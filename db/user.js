import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription: {
    type: DataTypes.ENUM("starter", "pro", "business"),
    allowNull: false,
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// await User.sync({ alter: true });

export default User;

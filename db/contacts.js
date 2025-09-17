import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import User from "./user.js";

const Contact = sequelize.define(
    "contact",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
        },
    }
);

User.hasMany(Contact, { foreignKey: "ownerId" });
Contact.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// dev:
// Contact.sync({ force: true }); //alter

export default Contact;
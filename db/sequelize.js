import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialectOptions: {
        ssl: true,
    }
});

try {
    await sequelize.authenticate();
    console.log("Database connection successfully");
} catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1);
}

export default sequelize;
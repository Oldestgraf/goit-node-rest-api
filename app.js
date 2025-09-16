import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import sequelize from "./db/sequelize.js";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import Contact from "./db/contacts.js";
import validationRouter from "./routes/validationRouter.js";
await sequelize.sync({ force: true });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/validation", validationRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});

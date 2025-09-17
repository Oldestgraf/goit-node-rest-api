import express from "express";
import auth from "../middlewares/auth.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import upload from "../middlewares/upload.js";

const contactsRouter = express.Router();

contactsRouter.use(auth);

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post(
  "/",
  upload.single("avatar"),
  createContact);
contactsRouter.put("/:id", updateContact);
contactsRouter.patch("/:id/favorite", updateStatusContact);

export default contactsRouter;

import { Router } from "express";
import { getContactsValidationController } from "../controllers/validationControllers.js";

const validationRouter = Router();

validationRouter.get("validation/contacts/", getContactsValidationController);

export default validationRouter;
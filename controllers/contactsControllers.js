import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact as updateContactService,
    updateStatusContact as updateStatusContactService,
} from "../services/contactsServices.js";

import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js"

export const getAllContacts = async(req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await removeContact(id);
    if (!deleted) throw HttpError(404, "Not found");
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const { name, email, phone, favorite } = req.body;
    const newContact = await addContact({ name, email, phone, favorite });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const { id } = req.params;
    const updated = await updateContactService(id, req.body);
    if (!updated) throw HttpError(404, "Not found");

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const { id } = req.params;
    const updated = await updateStatusContactService(id, req.body);
    if (!updated) throw HttpError(404, "Not found");

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

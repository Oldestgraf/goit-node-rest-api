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

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts(req.user.id);
    res.status(200).json(contacts);
  } catch (error) { next(error); }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.user.id, req.params.id);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
  } catch (error) { next(error); }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deleted = await removeContact(req.user.id, req.params.id);
    if (!deleted) throw HttpError(404, "Not found");
    res.status(200).json(deleted);
  } catch (error) { next(error); }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const newContact = await addContact(req.user.id, req.body);
    res.status(201).json(newContact);
  } catch (error) { next(error); }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) throw HttpError(400, "Body must have at least one field");

    const { error } = updateContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const updated = await updateContactService(req.user.id, req.params.id, req.body);
    if (!updated) throw HttpError(404, "Not found");

    res.status(200).json(updated);
  } catch (error) { next(error); }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const updated = await updateStatusContactService(req.user.id, req.params.id, req.body);
    if (!updated) throw HttpError(404, "Not found");
    res.status(200).json(updated);
  } catch (error) { next(error); }
};

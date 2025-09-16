import Contact from "../db/contacts.js";

export const listContacts = (ownerId) =>
  Contact.findAll({ where: { ownerId } });

export const getContactById = (ownerId, id) =>
  Contact.findOne({ where: { id, ownerId } });

export const removeContact = async (ownerId, id) => {
  const contact = await getContactById(ownerId, id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const addContact = (ownerId, payload) =>
  Contact.create({ ...payload, ownerId });

export const updateContact = async (ownerId, id, body) => {
  const contact = await getContactById(ownerId, id);
  if (!contact) return null;
  await contact.update(body);
  return contact;
};

export const updateStatusContact = async (ownerId, id, { favorite }) => {
  const contact = await getContactById(ownerId, id);
  if (!contact) return null;
  await contact.update({ favorite });
  return contact;
};

import Contact from "../db/contacts.js";

export const listContacts = () => Contact.findAll();

export const getContactById = id => Contact.findByPk(id);

export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export const addContact = payload => Contact.create(payload);

export const updateContact = async (id, body) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update(body);
  return contact;
}

export const updateStatusContact = async (id, { favorite }) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update({ favorite });
  return contact;
};

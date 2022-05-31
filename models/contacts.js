const fs = require('fs/promises');
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return data;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  if(!contact){
    return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contact = await getContactById(contactId);
  const newContacts = allContacts.filter(contact => contact.id !== contactId);
  console.table(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contact;}

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  console.table(allContacts);
  return newContact;
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
    if(contactIndex === -1){
      return null;
    }
  allContacts[contactIndex].name = name;
  allContacts[contactIndex].email = email;
  allContacts[contactIndex].phone = phone;
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

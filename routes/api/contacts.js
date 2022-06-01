const express = require('express');
const router = express.Router();
const Joi = require("joi");

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts.js');

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})
console.log(1);
const joiUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ 
      status: 'success',
      code: 200,
      contacts,
    });
    }
  catch(error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if(!contact){
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      contact,
    });
  }
  catch(error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = joiSchema.validate(req.body);
    if(error){
      return res.status(400).json({ message: error.message });
    }
    const contact = await addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      contact,
    });
  }
  catch(error) {
    next(error)
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if(!contact){
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      contact,
    });
  }
  catch(error) {
    next(error)
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const { error } = joiUpdateSchema.validate(req.body);
    if(error){
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await updateContact(contactId, name, email, phone);
    if(!contact){
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      contact,
    });
  }
  catch(error) {
    next(error)
  }
});

module.exports = router;

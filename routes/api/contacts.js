const express = require('express');
const router = express.Router();
// const { BadRequest, NotFound } = require("http-errors");
const Joi = require("joi");

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts.js');
// require('../../models/contacts')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

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
   
    // res.status(500).json({
    //     message: "Server not found"
    // })
  }
  // res.json({ status: 'success',
  // code: 200,
  // data: {
  //   contacts,
  // }, })
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if(!contact){
      // throw NotFound(404, "Not found")
      return res.status(404).json({ message: "Not found" });
    }
    // res.json(contact);
    res.json({
      status: "success",
      code: 200,
      contact,
    });
  }
  catch(error) {
    next(error)
  }

// {const { contactId } = req.params;
// const [contact] = contacts.filter(el => el.id === contactId);
// if(!contact){
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: `Contact with id=${contactId} not found`
//     // message: `Not found`
//   })
// }
// res.json({
//   status: 'success',
//   code: 200,
//   data: { 
//     contact 
//   }, })
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = joiSchema.validate(req.body);
    if(error){
      // throw new BadRequest(error.message)
      return res.status(400).json({ message: error.message });
      // error.status = 400;
      // throw error;
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

// {const { name, email, phone } = req.body;
// const contact = {
//   id: v4(),
//   name,
//   email,
//   phone,
// };

// contacts.push(contact);
// if(!contact){
//   res.status(400).json({
//     status: 'error',
//     code: 400,
//     message: `missing required name field`
//   })
// }
// res.status(201).json({
//   status: 'success',
//   code: 201,
//   data: { contact }, })
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if(!contact){
    // throw NotFound(404, "Not found")
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      contact,
    });
    // res.status(204).json({message: "Delete success"})
  }
  catch(error) {
    next(error)
  }
  
    // const { contactId } = req.params;
  // const newcontacts = contacts.filter(el => el.id !== contactId);
  // contacts = [...newcontacts];
  // if(!contactId){
  //   res.status(4004).json({
  //     status: 'error',
  //     code: 404,
  //     message: `Not found`
  //   })
  // }
  // res.status(204).json({ message: 'contact deleted' });
  // res.json({ message: 'contact deleted' })
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const { error } = joiUpdateSchema.validate(req.body);
    if(error){
      // throw new BadRequest(error.message)
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await updateContact(contactId, name, email, phone);
    if(!contact){
      // throw NotFound()
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

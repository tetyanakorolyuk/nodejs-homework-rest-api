const { Contact } = require('../models/contact');
const { validation } = require('../middlewares');
const { joiSchema, patchJoiSchema, updateJoiSchema } = require('../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contactsAll = await Contact.find({owner: _id }, "", {skip, limit: Number(limit)}).populate('owner', '_id email subscription');
    res.json({ 
      status: 'success',
      code: 200,
      contactsAll,
    });
    }
  catch(error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
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
};

const addContact = async (req, res, next) => {
  try {
    const { error } = validation(joiSchema);
    if(error){
      return res.status(400).json({ message: error.message });
    }
    const { _id } = req.user;
    const contact = await Contact.create({...req.body, owner: _id});
    res.status(201).json({
      status: "success",
      code: 201,
      contact,
    });
  }
  catch(error) {
    next(error)
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
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
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = validation(updateJoiSchema);
    if(error){
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
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
};

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = validation(patchJoiSchema);
    if(error){
      return res.status(400).json({ message: "missing fields favorite" });
    }
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
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
};

module.exports = { listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite };
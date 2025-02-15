const express = require('express');
const router = express.Router();
const { auth, validation } = require('../../middlewares');
const { joiSchema, patchJoiSchema, updateJoiSchema } = require('../../models/contact');
const { listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite } = require('../../controllers/contacts');

router.get('/', auth, listContacts);

router.get('/:contactId', getContactById);

router.post('/', auth, validation(joiSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validation(updateJoiSchema), updateContact);

router.patch('/:contactId/favorite', validation(patchJoiSchema), updateFavorite);

module.exports = router;

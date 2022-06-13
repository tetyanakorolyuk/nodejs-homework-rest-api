const express = require('express');
const router = express.Router();
const { registerUser, login, logout } = require('../../controllers/auth');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');
const { validation, auth } = require('../../middlewares');

router.post('/register', validation(joiRegisterSchema), registerUser);

router.post('/login', validation(joiLoginSchema), login);

router.get("/logout", auth, logout);

module.exports = router;

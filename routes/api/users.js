const express = require("express");

const { auth } = require("../../middlewares");
const { getCurrentUser } = require("../../controllers/getCurrentUser");

const router = express.Router();

router.get("/current", auth, getCurrentUser);

module.exports = router;
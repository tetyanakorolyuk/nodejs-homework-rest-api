const express = require("express");

const { auth, upload } = require("../../middlewares");
const { getCurrentUser, updateAvatar } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, getCurrentUser);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
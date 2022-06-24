const express = require("express");

const { auth, upload } = require("../../middlewares");
const { getCurrentUser, updateAvatar, verifyEmail, resend } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, getCurrentUser);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resend);

module.exports = router;
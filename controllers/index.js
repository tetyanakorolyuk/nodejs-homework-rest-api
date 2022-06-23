const { auth } = require("./auth");
const { contacts } = require("./contacts");
const { getCurrentUser } = require("./getCurrentUser");
const { updateAvatar } = require("./updateAvatar");
const { verifyEmail } = require("./verifyEmail");

module.exports = {
  auth,
  contacts,
  getCurrentUser,
  updateAvatar,
  verifyEmail
}
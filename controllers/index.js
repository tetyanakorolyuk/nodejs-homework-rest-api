const { auth } = require("./auth");
const { contacts } = require("./contacts");
const { getCurrentUser } = require("./getCurrentUser");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  auth,
  contacts,
  getCurrentUser,
  updateAvatar
}
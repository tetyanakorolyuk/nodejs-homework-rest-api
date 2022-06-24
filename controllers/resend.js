const { User } = require("../models/user");
const { sendEmail } = require("../helpers");
require("dotenv").config();

const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    if(!email) {
      return res.status(400).json({ message: "missing required field email" });
    }
    const user = await User.findUser({ email });

    const { verify, verificationToken } = user;
    if (verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    const mail = {
      to: email,
      subject: "Confirm email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`
    };
    await sendEmail(mail);

    return res.status(200).json({
      code: 200,
      message: "Verification email sent"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  resend
}
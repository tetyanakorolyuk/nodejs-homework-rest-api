const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

const registerUser = async(req, res, next)=> {
  try {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
      if(user){
        return res.status(409).json({ message: "Email in use" });
      }
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, subscription, avatarURL });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL
        }
      }
  });
} catch (error) {
  next(error);
}
}

const login = async(req, res, next)=> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user || !user.comparePassword(password)){
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = {
      id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      }
    });
  } catch (error) {
    next(error);
}
}

const logout = async(req, res, next)=> {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
}
}

module.exports = {
  registerUser,
  login,
  logout
}

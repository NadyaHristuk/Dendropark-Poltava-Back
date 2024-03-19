const bcrypt = require("bcryptjs");
const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HttpError(409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...userData, password: hashedPassword });
  return {
    email: newUser.email,
    name: newUser.name,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401);
  }
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token, online: true });
  return {
    id: user._id,
    name: user.name,
    email,
    start: user.createdAt,
    token,
  };
};

const getCurrentUser = async (email) => {
  const user = await User.findOne({ email });
  return {
    id: user._id,
    name: user.name,
    email,
    start: user.createdAt,
  };
};

const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    token: "",
    online: false,
    lastOnline: Date.now(),
  });
  return { message: "Logout success" };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};

const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginControler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found!!" });

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return res.status(403).json({ error: "Email/Password doesn't match!" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });

  res.json({
    success: true,
    token,
    role: user.role,
    profile: { name: user.name, email: user.email, role: user.role },
  });
};

exports.registerControler = async (req, res) => {
  const { email, name, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(403).json({ error: "The email is already in use!" });

  const user = await User.create({ email, password, name });

  res.json({ success: true, user });
};

exports.sendProfile = (req, res) => {
  res.json({
    profile: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

const User = require("../models/user");
require("dotenv").config();
const { isValidObjectId } = require("mongoose");

exports.showUser = async (req, res) => {
  const user = await User.find();
  res.json({
    user: user.map((user) => ({
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      password: user.password,
    })),
  });
};

exports.showUserById = async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId))
    return res.status(401).json({ error: "Invalid request!" });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found!" });
  res.json({ success: true, user });
};

exports.addUser = async (req, res) => {
  const { name, email, role, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(403).json({ error: "The email is already in use!" });

  const user = await User.create({ email, password, name, role });

  res.json({ success: true, user });
};

exports.updateUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  const { userId } = req.params;

  if (!isValidObjectId(userId))
    return res.status(401).json({ error: "Invalid request!" });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found!" });

  user.name = name;
  user.email = email;
  user.password = password;
  user.role = role;

  await user.save();

  res.json({ success: true, user });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId))
    return res.status(401).json({ error: "Invalid request!" });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found!" });

  await User.findByIdAndDelete(userId);
  res.json({ message: "User removed successfully!" });
};

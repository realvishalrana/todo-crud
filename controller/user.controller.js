const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await userModel.findById(id);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      todo: findUser,
      message: "User found successfully",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    const user = await userModel.create(userData);
    res.status(201).json(user);
  } catch (error) {
    console.log("errors", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updateUserData = await userModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updateUserData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      todo: updateUserData,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log("errors", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      return res.json({ message: `Deleted user with id ${id}` });
    } else {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};

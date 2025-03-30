const userModel = require("../models/user.models");

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

    if (await userModel.exists({ email: userData.email })) {
      return res.status(400).json({ message: "User already exists" });
    }

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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

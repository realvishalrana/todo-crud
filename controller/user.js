import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllUser = async (req, res) => {
  try {
    const { username, email, search } = req.query;

    const filter = {};

    // Filter by exact username or email if provided
    if (username) filter.username = username;
    if (email) filter.email = email;

    // Search across username and email if 'search' keyword is provided
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const getUser = await UserModel.find(filter);

    return res.status(200).json(getUser);
  } catch (error) {
    return res.status(500).json({ message: "getUser Error", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(200).json({
        message: `No User Found with ${id}`,
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "getUserById Error", error });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    const existingUser = await UserModel.exists({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.create({ username, email, password: hash });
    if (!user) {
      return res.status(500).json({ message: "User not created" });
    }

    return res.status(201).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "createUser Error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "updateUser Error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndDelete(id, {
      new: true,
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "deleteUser Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "loginUser Error", error: error.message });
  }
};

export {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};

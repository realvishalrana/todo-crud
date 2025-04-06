import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const fetchAllUsers = async ({ username, email, search }) => {
  const filter = {};
  if (username) filter.username = username;
  if (email) filter.email = email;
  if (search) {
    filter.$or = [
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  return await UserModel.find(filter);
};

const fetchUserById = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) throw new Error(`No User Found with id ${id}`);
  return user;
};

const createUser = async ({ username, email, password }) => {
  const existing = await UserModel.exists({ email });
  if (existing) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ username, email, password: hashedPassword });
  if (!user) throw new Error('User creation failed');

  return user;
};

const updateUser = async (id, updateData) => {
  return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id, { new: true });
};

const authenticateUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export {
  fetchAllUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
};

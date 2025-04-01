const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/user.controller.js");
const authentication = require("../middleware/auth.js");

// Public Routes (No authentication needed)
router.post("/", createUser); // User Registration
router.post("/login", loginUser); // User Login

// Protected Routes (Authentication required for all routes below)
router.use(authentication);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

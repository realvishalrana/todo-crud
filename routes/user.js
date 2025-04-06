import express from "express";
import jwt from "jsonwebtoken";
import { validate } from "../middleware/validate.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controller/user.js";
import { createUserSchema, loginUserSchema } from "../validation/user.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/create", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), loginUser);

router.use(verifyToken);

router.get("/", getAllUser);
router.get("/:id", validateObjectId, getUserById);
router.patch("/:id", validateObjectId, updateUser);
router.delete("/:id", validateObjectId, deleteUser);

export default router;

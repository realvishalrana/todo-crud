const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByBlogId,
  getCommentsByUserId,
} = require("../controller/comment.controller.js");

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/blog/:blogId", getCommentsByBlogId);
router.get("/user/:userId", getCommentsByUserId);

module.exports = router;

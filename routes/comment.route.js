const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller.js");

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;

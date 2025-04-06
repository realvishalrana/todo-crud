const express = require("express");
const router = express.Router();

const {
  getAllBlogs,
  getBlogById,
  getBlogByUser,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller.js");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.get("/user/:id", getBlogByUser);
router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;

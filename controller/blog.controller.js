const blogModal = require("../models/blog.models");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModal.find();
    return res.json(blogs);
  } catch (error) {
    console.log("errors", error);
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findById(id);
    return res.json(blog);
  } catch (error) {
    console.log("errors", error);
  }
};

const getBlogByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.find({ author: id });
    console.log("line 35", blog);
    return res.json(blog);
  } catch (error) {
    console.log("errors", error);
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = req.body;

    const isBlogTitleExists = await blogModal.findOne({ title: blog.title });
    if (isBlogTitleExists) {
      return res.status(400).json({ message: "Blog title already exists" });
    }
    const newBlog = await blogModal.create(req.body);

    return res.json(newBlog);
  } catch (error) {
    console.log("errors", error);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(blog);
  } catch (error) {
    console.log("errors", error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModal.findByIdAndDelete(id);
    return res.json(blog);
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getBlogByUser,
  createBlog,
  updateBlog,
  deleteBlog,
};

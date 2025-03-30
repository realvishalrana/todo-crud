const commentModal = require("../models/comment.models");

const getAllComments = async (req, res) => {
  try {
    const comments = await commentModal
      .find({})
      .populate("blog")
      .populate("user");
    return res.json(comments);
  } catch (error) {
    console.log("errors", error);
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModal.findById(id);
    return res.json(comment);
  } catch (error) {
    console.log("errors", error);
  }
};

const createComment = async (req, res) => {
  try {
    const comment = req.body;
    const newComment = await commentModal.create(comment);
    return res.json(newComment);
  } catch (error) {
    console.log("errors", error);
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(comment);
  } catch (error) {
    console.log("errors", error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModal.findByIdAndDelete(id);
    return res.json(comment);
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};

const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true }, // Reference to Blog
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Id is required"],
    },
    text: {
      type: String,
      required: [true, "Text is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todos", todoSchema);

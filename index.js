const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const todoRoute = require("./routes/todo.route.js");
const userRoute = require("./routes/user.route.js");
const blogRoute = require("./routes/blog.route.js");
const commentRoute = require("./routes/comment.route.js");

app.use(express.json());


app.use("/todos", todoRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentRoute);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => console.log("Example app listening on port 3000!"));
  })
  .catch((e) => console.log(e));

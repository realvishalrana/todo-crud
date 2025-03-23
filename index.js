const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const todoRoute = require("./routes/todo.route.js");

app.use(express.json());


app.use("/todos", todoRoute);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => console.log("Example app listening on port 3000!"));
  })
  .catch((e) => console.log(e));

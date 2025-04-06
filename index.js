import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}!`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRouter);

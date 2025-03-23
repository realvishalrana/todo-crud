const express = require("express");
const router = express.Router();
const { getTodos, getTodosById, addTodo, deleteTodo, updatedTodo } = require("../controller/todo.controller.js");

router.get("/", getTodos);
router.get("/:id", getTodosById);
router.patch("/:id", updatedTodo);
router.post("/addTodo", addTodo);
router.delete("/:id", deleteTodo);

module.exports = router;

const todoModal = require("../models/todo.models.js");

const getTodos = async (req, res) => {
  try {
    const todos = await todoModal.find().sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(
      500,
      json({
        message: error.message,
      })
    );
  }
};

// route.get("/todos", async (req, res) => {
//   const todos = await todoModal
//     .find(
//       {
//         text: "Todo 5", // match only text with Todo 5
//       },
//       {
//         id: 1,
//         text: 1,
//         _v :0 // not return version
//       }
//     )
//     .sort({
//       createdAt: -1, // sort by createdAt in descending order
//     });
//   res.status(200).json(todos);
// });

const getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    const findTodo = await todoModal.findById(id);

    if (!findTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      todo: findTodo,
      message: "Todo found successfully",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const addTodo = async (req, res) => {
  try {
    const todo = req.body;

    if (await todoModal.exists({ id: todo.id })) {
      return res.status(400).json({ message: "Todo already exists" });
    }

    await todoModal.create(todo);

    const todos = await todoModal.find();
    return res.status(201).json(todos);

    // Option 2: Return just the created todo.
    // const createdTodo = await todoModal.findOne({ id: todo.id });
    // return res.status(201).json(createdTodo);
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await todoModal.findByIdAndDelete(id);
    if (deletedTodo) {
      return res.json({ message: `Deleted todo with id ${id}` });
    } else {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const updatedTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = req.body; // e.g., { title: "Updated Todo" }

    // This call updates the todo with the provided fields.
    const updatedTodo = await todoModal.findByIdAndUpdate(id, todo, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      todo: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getTodos,
  getTodosById,
  addTodo,
  updatedTodo,
  deleteTodo,
};

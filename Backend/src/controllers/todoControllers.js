const Todo = require("../models/Todo");
const Counter = require("../models/Counter");

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
};

// Get All To Do's
exports.getTodos = async (req, res) => {
  try {
    const { status, title, startDate, endDate, todoId } = req.query;

    let query = {};

    if (todoId) {
      if (isNaN(todoId)) {
        return res.status(400).json({ message: "Invalid todoId" });
      }
      query.todoId = Number(todoId);
    }

    if (status !== undefined) {
      query.status = status === "true";
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (startDate || endDate) {
      query.targetDate = {};

      if (startDate) {
        query.targetDate.$gte = new Date(startDate);
      }

      if (endDate) {
        query.targetDate.$lte = new Date(endDate);
      }
    }

    console.log("Query: ", query);

    const todos = await Todo.find(query);
    const total = await Todo.countDocuments(query);

    const formatted = todos.map((todo) => ({
      todoId: todo.todoId,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      targetDate: formatDate(todo.targetDate),
      createdAt: formatDate(todo.createdAt),
      updatedAt: formatDate(todo.updatedAt),
    }));

    res.json({
      total_no_of_records: total,
      message: "Success",
      To_Do: formatted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createToDo = async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({
      title,
      description,
      targetDate,
    });

    const savedTodo = await todo.save();

    const response = {
      todoId: savedTodo.todoId,
      title: savedTodo.title,
      description: savedTodo.description,
      status: savedTodo.status,
      targetDate: formatDate(savedTodo.targetDate),
      createdAt: formatDate(savedTodo.createdAt),
      updatedAt: formatDate(savedTodo.updatedAt),
    };

    res.status(201).json({
      message: "Created Successfully",
      Response_To_Do: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, status, targetDate } = req.body;
    let updateData = {};

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID!" });
    }

    const existingTodo = await Todo.findOne({ todoId: Number(id) });

    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (existingTodo.status === true) {
      return res.status(400).json({
        message: "Completed Tasks cannot be modified",
      });
    }

    if (
      status !== undefined &&
      status !== null &&
      status.toString().trim() !== ""
    ) {
      updateData.status = status;
    }

    if (
      description !== undefined &&
      description !== null &&
      description.trim() !== ""
    ) {
      updateData.description = description;
    }

    if (
      targetDate !== undefined &&
      targetDate !== null &&
      targetDate.trim() !== ""
    ) {
      const newDate = new Date(targetDate).toISOString().split("T")[0];
      const existingDate = existingTodo.targetDate
        ? new Date(existingTodo.targetDate).toISOString().split("T")[0]
        : null;

      if (newDate !== existingDate) {
        updateData.targetDate = targetDate;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({
        message: "No valid fields to update",
        currentData: {
          todoId: existingTodo.todoId,
          title: existingTodo.title,
          description: existingTodo.description,
          status: existingTodo.status,
          targetDate: formatDate(existingTodo.targetDate),
        },
      });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { todoId: Number(id) },
      updateData,
      { new: true },
    );

    res.json({
      message: "Updated Successfully",
      updatedToDo: {
        todoId: updatedTodo.todoId,
        title: updatedTodo.title,
        description: updatedTodo.description,
        status: updatedTodo.status,
        targetDate: formatDate(updatedTodo.targetDate),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTodo = await Todo.findOne({ todoId: Number(id) });

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID!" });
    }

    if (!existingTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await Todo.findOneAndDelete({ todoId: Number(id) });

    res.json({
      message: "Deleted Successfully",
      deletedToDo: {
        todoId: existingTodo.todoId,
        title: existingTodo.title,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllTodos = async (req, res) => {
  try {
    const totalBefore = await Todo.countDocuments();

    // 🔹 If nothing exists
    if (totalBefore === 0) {
      return res.status(200).json({
        message: "No todos to delete",
        deletedCount: 0,
      });
    }
    
    const result = await Todo.deleteMany({});
    const resultcounter = await Counter.deleteOne({});

    res.json({
      message: "All todos cleared successfully",
      deletedCount: totalBefore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

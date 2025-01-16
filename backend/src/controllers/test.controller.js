import Todo from "../model/test.model.js";

//---------------- Add todo Controller -------------------
export const addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const newTodo = new Todo({
            title,
            description,
            todoState: "pending", // Default value
        });

        const savedTodo = await newTodo.save();

        res.status(201).json({
            message: "Todo created successfully.",
            data: savedTodo,
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            message: "Failed to create todo.",
            error: error.message,
        });
    }
};


//   ------------------- Get all Todos ------------------------
export const getAllTodos = async (req, res) => {
    try {

        const todos = await Todo.find();

        if (todos.length === 0) {
            return res.status(404).json({ message: "No todos found." });
        }

        res.status(200).json({
            message: "Todos fetched successfully.",
            data: todos,
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            message: "Failed to fetch todos.",
            error: error.message,
        });
    }
};


//--------------------- Update todo -----------------------------
export const updateTodo = async (req, res) => {
    try {
        const { id, title, description } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Todo ID is required." });
        }

        if (!title && !description) {
            return res.status(400).json({ message: "At least one field (title or description) must be provided for update." });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.status(200).json({
            message: "Todo updated successfully.",
            data: updatedTodo,
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            message: "Failed to update todo.",
            error: error.message,
        });
    }
};



//-----------------------  Update Todo State ----------------------
export const updateTodoState = async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ message: "Todo ID is required." });
        }

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        const newState = todo.todoState === "pending" ? "completed" : "pending";
        todo.todoState = newState;

        const updatedTodo = await todo.save();

        res.status(200).json({
            message: `Todo state updated successfully to "${newState}".`,
            data: updatedTodo,
        });
    } catch (error) {
        console.error("Error updating todo state:", error);
        res.status(500).json({
            message: "Failed to update todo state.",
            error: error.message,
        });
    }
};



//-------------------------------- Delete Todo -----------------------
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Todo ID is required." });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.status(200).json({
            message: "Todo deleted successfully.",
            data: deletedTodo,
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            message: "Failed to delete todo.",
            error: error.message,
        });
    }
};

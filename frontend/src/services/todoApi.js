import apiClient from "./apiClient";

export async function fetchTodos(filters = {}) {
  try {
    const response = await apiClient.get("/todo/fetchTodo", {
      params: filters,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

export async function createTodo(todoData) {
  try {
    const response = await apiClient.post("/todo/createTodo", todoData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}

export async function updateTodo(todoId, todoData) {
  try {
    const response = await apiClient.put(
      `/todo/updateTodo/${todoId}`,
      todoData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating todo ${todoId}:`, error);
    throw error;
  }
}

export async function deleteTodoOne(todoId) {
  try {
    const response = await apiClient.delete(`/todo/Delete-One/${todoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo ${todoId}:`, error);
    throw error;
  }
}

export async function deleteAllTodos() {
  try {
    const response = await apiClient.delete("/todo/Clear-ALL");
    return response.data;
  } catch (error) {
    console.error("Error deleting all todos:", error);
    throw error;
  }
}

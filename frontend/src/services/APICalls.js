import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchTodos = async (filters = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/todo/fetchTodo`, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

export const createTodo = async (todoDate) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/todo/createTodo`, todoDate);
        console.log('Create Todo Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error Creating todos:', error);
        throw error;
    }
}

export const updateTodo = async (todoId, todoDate) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/todo/updateTodo/${todoId}`, todoDate);
        console.log('Update Todo Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error Updating todo ${todoId}:`, error);
        throw error;
    }
}

export const deleteTodoOne = async (todoId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/todo/Delete-One/${todoId}`);
        console.log('Delete Todo Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error Deleting todo ${todoId}:`, error);
        throw error;
    }   
}

export const deleteAllTodos = async () => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/todo/Clear-ALL`);
        console.log('Delete Todo Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error Deleting todos.`, error);
        throw error;
    }   
}
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const insertTodo = (payload: any) => api.post(`/todo`, payload);
export const getAllTodos = () => api.get(`/todos`);
export const deleteTodoById = (id: any) => api.delete(`/todo/${id}`);
export const getTodoById = (id: any) => api.get(`/todo/${id}`);

export default {
  insertTodo,
  getAllTodos,
  deleteTodoById,
  getTodoById,
};

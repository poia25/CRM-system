import { TodoStatus, TodoRequest } from "../types/todo.ts";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function addTask(task: TodoRequest) {
  try {
    const response = await axiosInstance.post("/todos", task);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавление", error);
    return null;
  }
}

export const deleteTask = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при Удалении", error);
    return null;
  }
};

export const editTask = async (id: number, isDone: boolean) => {
  try {
    const payload = {
      isDone: !isDone,
    };
    const response = await axiosInstance.put(`/todos/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Ошибка при Изменение", error);
    return null;
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  try {
    const response = await axiosInstance.get(`/todos`,{
      params: {filter:status} 
    });
    return response.data;
  } catch (error) {
    console.error("Данные не загруженны", error);
    return null;
  }
};

export const updateTask = async (id: number, updatedData: TodoRequest) => {
  try {
    const payload = {
      title: updatedData.title,
    };

    const response = await axiosInstance.put(`/todos/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Ошибка при Изменение title", error);
    return null;
  }
};
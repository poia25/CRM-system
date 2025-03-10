import { TodoStatus, TodoRequest } from "../types/todo.ts";
<<<<<<< HEAD
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
=======

const url = "https://easydev.club/api/v1/todos";

export async function addTask(task: TodoRequest) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
  }
}

export const deleteTask = async (id: number) => {
<<<<<<< HEAD
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при Удалении", error);
    return null;
=======
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
  }
};

<<<<<<< HEAD
export const editCheckBox = async (id: number, isDone: boolean) => {
  try {
    const payload = {
      isDone: isDone,
    };
    const response = await axiosInstance.put(`/todos/${id}`, payload);
    return response.data;
=======
export const EditingTask = async (id: number, isDone: boolean) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDone: !isDone, // Меняем состояние на противоположное
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при обновлении задачи");
    }
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Ошибка API:", error);
    throw error;
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  const queryParam = status ? `?filter=${status}` : "";
  const allUrl = `${url}${queryParam}`;

  try {
    const response = await fetch(allUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data;
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
  } catch (error) {
    console.error("Ошибка при Изменение", error);
    return null;
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  try {
    const response = await axiosInstance.get(`/todos`, {
      params: { filter: status },
    });
    return response.data;
  } catch (error) {
    console.error("Данные не загруженны", error);
    return null;
  }
};

export const updateTask = async (id: number, updatedData: TodoRequest) => {
  try {
<<<<<<< HEAD
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
=======
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch {
    throw new Error("Failed to update the task");
  }
};
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190

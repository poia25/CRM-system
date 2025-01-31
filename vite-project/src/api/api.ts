import { TodoStatus, TodoRequest } from "../types/todo.ts";

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
  }
  return response.json();
}

export const deleteTask = async (id: number) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  let data = null;
  if (response.headers.get("Content-Type")?.includes("application/json")) {
    data = await response.json();
  }

  return data;
};

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
  } catch (error) {
    console.error("Ошибка при вызове API:", error);
  }
};

export const updateTask = async (id: number, updatedData: TodoRequest) => {
  try {
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

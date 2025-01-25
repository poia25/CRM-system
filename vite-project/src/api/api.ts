import { TodoStatus, TodoRequest } from "../types/todo.ts";
import axios from "axios";

const url = "https://easydev.club/api/v1/todos";

export async function Fetch() {
  const response = await axios.get(url);
  return response.data;
}

export async function addTask(task: TodoRequest) {
  const response = await axios.post(url, task, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

export const EditingTask = async (id: number, isDone: boolean) => {
  const payload = {
    isDone: !isDone,
  };
  const response = await axios.put(`${url}/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const fetchTodos = async (
  status: TodoStatus.All | TodoStatus.Completed | TodoStatus.Pending
) => {
  const queryParam = status ? `?filter=${status}` : "";
  const response = await axios.get(`${url}${queryParam}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateTask = async (id: number, updatedData: TodoRequest) => {
  const payload = {
    title: updatedData.title,
  };

  const response = await axios.put(`${url}/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

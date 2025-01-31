import { TodoStatus, TodoRequest } from "../types/todo.ts";
import axios from "axios";

const url = "https://easydev.club/api/v1/todos";

export async function addTask(task: TodoRequest) {
  try {
    const response = await axios.post(url, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }catch(error) {
    console.error('Ошибка при добавление', error)
    return null;
  }
}

export const deleteTask = async (id: number) => {
  try{
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  }catch(error) {
    console.error('Ошибка при Удалении', error)
    return null
  }
};

export const EditingTask = async (id: number, isDone: boolean) => {
  try {
    const payload = {
      isDone: !isDone,
    };
    const response = await axios.put(`${url}/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }catch(error){
    console.error('Ошибка при Изменение', error)
    return null
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  try {
    const queryParam = status ? `?filter=${status}` : "";
    const response = await axios.get(`${url}${queryParam}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }catch(error){
    console.error('Данные не загруженны', error)
    return null
  }
};

export const updateTask = async (id: number, updatedData: TodoRequest) => {
  try {
    const payload = {
      title: updatedData.title,
    };
  
    const response = await axios.put(`${url}/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }catch(error) {
    console.error('Ошибка при Изменение title', error)
    return null
  }
};

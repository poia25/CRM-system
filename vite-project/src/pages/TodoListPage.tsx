import { useState, useEffect, useRef, useCallback } from "react";
import { TodoInfo, TodoStatus, Todo } from "../types/todo.ts";
import { fetchTodos } from "../api/api.ts";
import TodoForm from "../components/Form/TodoForm.tsx";
import Tabs from "../components/Tab/Tabs.tsx";
import TodoList from "../components/List/TodoList.tsx";

function TodoPage() {
  const [data, setData] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [activeTab, setActiveTab] = useState<TodoStatus>(TodoStatus.All);
  const prevDataRef = useRef();

  const loadTodos = useCallback(async () => {
    const response = await fetchTodos(activeTab);
    if (response) {
      if (
        JSON.stringify(response.data) === JSON.stringify(prevDataRef.current)
      ) {
        return;
      }

      setInfo(response.info);
      setData(response.data);
      prevDataRef.current = response.data;
    }
  }, [activeTab, data]);

  useEffect(() => {
    loadTodos();
    const interval = setInterval(() => {
      loadTodos();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <>
      <div className="App">
        <TodoForm loadTodos={loadTodos} />
        <Tabs info={info} activeTab={activeTab} setActiveTab={setActiveTab} />
        <TodoList todos={data} loadTodos={loadTodos} />
      </div>
    </>
  );
}

export default TodoPage;

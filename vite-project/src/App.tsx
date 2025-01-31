import { useState, useEffect } from "react";
import { Todo, TodoInfo } from "./types/todo.ts";
import { fetchTodos } from "./api/api.ts";
import TodoForm from "./components/Form/TodoForm.tsx";
import Tabs from "./components/Tab/Tabs.tsx";
import { TodoStatus } from "./types/todo.ts";
import TodoList from "./components/List/TodoList.tsx";

function App() {
  const [data, setData] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [activeTab, setActiveTab] = useState<TodoStatus>(TodoStatus.All);

  const loadTodos = async () => {
    const response = await fetchTodos(activeTab);
    if (response) {
      setInfo(response.info || null);
      setData(response.data);
    }
  };
  useEffect(() => {
    loadTodos();
  }, [activeTab]);
  
  return (
    <div className="App">
      <TodoForm loadTodos={loadTodos} />
      <Tabs info={info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TodoList todos={data} setData={setData} loadTodos={loadTodos} />
    </div>
  );
}

export default App;

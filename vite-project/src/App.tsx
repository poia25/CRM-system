import { useState, useEffect } from "react";
import { Todo, TodoInfo } from "./types/todo.ts";
import { Fetch, fetchTodos } from "./api/api.ts";
import TodoForm from "./components/Form/TodoForm.tsx";
import Tabs from "./components/Tab/Tabs.tsx";
import { TodoStatus } from "./types/todo.ts";
import TodoList from "./components/List/TodoList.tsx";

function App() {
  const [data, setData] = useState<Todo[]>([
    { id: 123, title: "Привет", created: "asdasda", isDone: false },
  ]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [activeTab, setActiveTab] = useState<TodoStatus>(TodoStatus.All);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Fetch();
        setData(result.data);
      } catch {
        console.log("БЕДА");
      }
    };
    fetchData();
  }, []);

  const loadTodos = async () => {
    const response = await fetchTodos(TodoStatus.All);
    if (response) {
      setInfo(response.info || null);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTasks = data?.filter((task) => {
    if (activeTab === "completed") return !task.isDone;
    if (activeTab === "pending") return task.isDone;
    return true;
  });
  return (
    <div className="App">
      <TodoForm setData={setData} loadTodos={loadTodos} />
      <Tabs info={info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TodoList todos={filteredTasks} setData={setData} loadTodos={loadTodos} />
    </div>
  );
}

export default App;

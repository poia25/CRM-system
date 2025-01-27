import { useState, useEffect } from "react";
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

  const loadTodos = async () => {
    const response = await fetchTodos(TodoStatus.All);
    if (response) {
      setInfo(response.info || null);
      setData(response.data);
    }
  };
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const result = await Fetch();
    //     setData(result.data);
    //   } catch {
    //     console.log("БЕДА");
    //   }
    // };
    // fetchData();
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 5000);
    // return () => clearInterval(interval);
    loadTodos();
    const interval = setInterval(() => {
      loadTodos();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadTodos();
    const interval = setInterval(() => {
      loadTodos();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const filteredTasks = data?.filter((task) => {
  //   if (activeTab === "completed") return !task.isDone;
  //   if (activeTab === "pending") return task.isDone;
  //   return true;
  // });
  return (
    <>
      <div className="App">
        <TodoForm setData={setData} loadTodos={loadTodos} />
        <Tabs info={info} activeTab={activeTab} setActiveTab={setActiveTab} />
        <TodoList todos={data} setData={setData} loadTodos={loadTodos} />
      </div>
    </>
  );
}

export default TodoPage;

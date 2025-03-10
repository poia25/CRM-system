import React from "react";
import Task from "./Task.tsx";
import { Todo } from "../../types/todo.ts";
import { List } from "antd";

interface TodoListProps {
  todos: Todo[];
  loadTodos: () => void;
}

<<<<<<< HEAD
const TodoList: React.FC<TodoListProps> = React.memo(({ todos, loadTodos }) => {
  return (
    <div>
      <List
        dataSource={todos}
        size="large"
        renderItem={(todo) => (
          <List.Item>
            <Task todo={todo} loadTodos={loadTodos} />
          </List.Item>
        )}
      />
=======
const TodoList: React.FC<TodoListProps> = ({ todos, loadTodos }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const startEditing = (id: number, currentTitle: string) => {
    setEditId(id);
    setEditTitle(currentTitle);
  };
  const finishEditing = async (editId: number, editTitle: string) => {
    try {
      await updateTask(editId, { title: editTitle });
      await loadTodos();
      setEditId(null);
      setEditTitle("");
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };
  const closeEdeting = () => {
    setEditId(null);
  };

  return (
    <div>
      <ul className={styles.list}>
        {todos?.map((todo) => (
          <li key={todo.id} className={styles.taskItem}>
            <Task
              todo={todo}
              data={todos}
              loadTodos={loadTodos}
              startEditing={startEditing}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              closeEdeting={closeEdeting}
              finishEditing={finishEditing}
              editId={editId}
            />
          </li>
        ))}
      </ul>
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
    </div>
  );
});

export default TodoList;

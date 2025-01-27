import { useState } from "react";
import { Todo } from "../../types/todo.ts";
import Task from "./Task.tsx";
import { updateTask } from "../../api/api.ts";
import styles from "./List.module.css";

interface TodoListProps {
  todos: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
  loadTodos: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setData, loadTodos }) => {
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
    </div>
  );
};

export default TodoList;

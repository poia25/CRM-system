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
    console.log(editId);
  };
  const finishEditing = async (editId: number, editTitle: string) => {
    try {
      const updatedTask = await updateTask(editId, { title: editTitle });
      setData((prevTodos: Todo[]) =>
        prevTodos.map((todo: Todo) =>
          todo.id === editId ? { ...todo, ...updatedTask } : todo
        )
      );
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
            {editId === todo.id ? (
              <>
                <input
                  className={styles.change}
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <div className={styles.actions_2}>
                  <button onClick={closeEdeting} className={styles.btn1}>
                    Отмена
                  </button>
                  <button
                    className={styles.btn2}
                    onClick={() => finishEditing(editId, editTitle)}
                  >
                    Сохранить
                  </button>
                </div>
              </>
            ) : (
              <>
                <Task
                  todo={todo}
                  data={todos}
                  setData={setData}
                  loadTodos={loadTodos}
                  startEditing={startEditing}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTask, EditingTask } from "../../api/api";
import { Todo } from "../../types/todo";
import styles from "./List.module.css";

interface TaskProps {
  todo: Todo;
  data: Todo[];
  loadTodos: () => void;
  startEditing: (id: number, currentTitle: string) => void;
  editTitle: string;
  editId: number | null;
  setEditTitle: (title: string) => void;
  finishEditing: (id: number, title: string) => void;
  closeEdeting: () => void;
}

const Task: React.FC<TaskProps> = ({
  todo,
  data,
  loadTodos,
  startEditing,
  editTitle,
  editId,
  setEditTitle,
  finishEditing,
  closeEdeting,
}) => {
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      await loadTodos();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const toogleTask = async (id: number) => {
    const task = data.find((t) => t.id === id);
    if (!task) return;
    try {
      await EditingTask(id, task.isDone);
      await loadTodos();
    } catch (error) {
      console.error("Не удалось обновить задачу:", error);
    }
  };

  return (
    <>
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
          <div>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => toogleTask(todo.id)}
              className={styles.input}
            />
            <span
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "#a8a8a8" : "black",
              }}
            >
              {todo.title}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.edit}
              onClick={() => startEditing(todo.id, todo.title)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="btn"
              onClick={() => handleDeleteTask(todo.id)}
              style={{ backgroundColor: "red" }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "white", height: "12px" }}
              />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Task;

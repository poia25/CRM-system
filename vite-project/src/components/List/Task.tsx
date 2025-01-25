import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTask, EditingTask } from "../../api/api";
import { Todo } from "../../types/todo";
import styles from "./List.module.css";
import { Button, Checkbox, Space, Typography } from "antd";

const { Text } = Typography;

interface TaskProps {
  todo: {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
  };
  data: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
  loadTodos: () => void;
  startEditing: (id: number, currentTitle: string) => void;
}

const Task: React.FC<TaskProps> = ({
  todo,
  data,
  setData,
  loadTodos,
  startEditing,
}) => {
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setData((prevTodo) => prevTodo.filter((todo) => todo.id !== id)); // Удаляем из состояния
      loadTodos();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const toogleTask = async (id: number) => {
    const task = data.find((t) => t.id === id);
    if (!task) return;
    try {
      const updatedTask = await EditingTask(id, task.isDone);
      setData((prevData) =>
        prevData.map((t) =>
          t.id === id ? { ...t, isDone: updatedTask.isDone } : t
        )
      );
      loadTodos();
    } catch (error) {
      console.error("Не удалось обновить задачу:", error);
    }
  };

  return (
    <>
      <Space>
        <Checkbox
          checked={todo.isDone}
          onChange={() => toogleTask(todo.id)}
          className={styles.input}
        />
        <Text
          style={{
            textDecoration: todo.isDone ? "line-through" : "none",
            color: todo.isDone ? "#a8a8a8" : "black",
          }}
        >
          {todo.title}
        </Text>
      </Space>

      <div className={styles.actions}>
        <Button
          type="primary"
          onClick={() => startEditing(todo.id, todo.title)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button type="primary" danger onClick={() => handleDeleteTask(todo.id)}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "white", height: "12px" }}
          />
        </Button>
      </div>
    </>
  );
};

export default Task;

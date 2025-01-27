import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTask, EditingTask } from "../../api/api";
import { Todo } from "../../types/todo";
import styles from "./List.module.css";
import { Button, Checkbox, Space, Typography, Form, Input } from "antd";

const { Text } = Typography;

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
        <Form>
          <Space>
            <Form.Item
              name="input"
              rules={[
                { required: true, message: "Input is required!" },
                {
                  min: 2,
                  message: "Input must be at least 2 characters long!",
                },
                {
                  max: 64,
                  message: "Input cannot exceed 64 characters!",
                },
              ]}
              style={{ marginTop: "20px" }}
            >
              <Input
                defaultValue={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Item>
            <Button onClick={closeEdeting} type="primary" danger>
              Отмена
            </Button>
            <Button
              onClick={() => finishEditing(editId, editTitle)}
              type="primary"
            >
              Сохранить
            </Button>
          </Space>
        </Form>
      ) : (
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
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteTask(todo.id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "white", height: "12px" }}
              />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Task;

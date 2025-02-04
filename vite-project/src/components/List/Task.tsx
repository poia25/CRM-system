import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTask, editTask, updateTask } from "../../api/api";
import styles from "./List.module.css";
import { Button, Checkbox, Space, Typography, Form, Input } from "antd";
import { Todo } from "../../types/todo";
import { useState } from "react";

const { Text } = Typography;

export interface TaskProps {
  todo: Todo;
  data: Todo[];
  loadTodos: () => void;
}

const Task: React.FC<TaskProps> = ({ todo, data, loadTodos }) => {
  const [editId, setEditId] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");

  const startEditing = (currentTitle: string) => {
    setEditId(true);
    setEditTitle(currentTitle);
  };
  const finishEditing = async (id: number, editTitle: string) => {
    try {
      await updateTask(id, { title: editTitle });
      await loadTodos();
      setEditId(false);
      setEditTitle("");
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };
  const closeEdeting = () => {
    setEditId(false);
  };
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
      await editTask(id, task.isDone);
      await loadTodos();
    } catch (error) {
      console.error("Не удалось обновить задачу:", error);
    }
  };

  return (
    <>
      {editId ? (
        <Form
          initialValues={{ title: editTitle }}
          onFinish={() => finishEditing(todo.id, editTitle)}
        >
          <Space>
            <Form.Item
              name="title"
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
              <Input onChange={(e) => setEditTitle(e.target.value)} />
            </Form.Item>
            <Button onClick={closeEdeting} type="primary" danger>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary">
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
            <Button type="primary" onClick={() => startEditing(todo.title)}>
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

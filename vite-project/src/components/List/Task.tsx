import { deleteTask, editCheckBox, updateTask } from "../../api/api";
import styles from "./List.module.css";
import { Button, Checkbox, Space, Typography, Form, Input } from "antd";
import { Todo } from "../../types/todo";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

<<<<<<< HEAD
const { Text } = Typography;

export interface TaskProps {
  todo: Todo;
  loadTodos: () => void;
}

const Task: React.FC<TaskProps> = ({ todo, loadTodos }) => {
  const [form] = Form.useForm();
  const [isEditId, setIsEditId] = useState<boolean>(false);

  const finishEditing = async () => {
    const valuesInput = form.getFieldsValue();
    try {
      await updateTask(todo.id, { title: valuesInput.title });
      await loadTodos();
      setIsEditId(false);
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };

=======
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
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      await loadTodos();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const toogleTask = async (id: number, task: Todo) => {
    try {
<<<<<<< HEAD
      await editCheckBox(id, !task.isDone);
=======
      await EditingTask(id, task.isDone);
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
      await loadTodos();
    } catch (error) {
      console.error("Не удалось обновить задачу:", error);
    }
  };
  
  const handleCloseEditing = () => {
    setIsEditId(false);
    form.resetFields()
  }

  return (
    <>
<<<<<<< HEAD
      {isEditId ? (
        <Form
          form={form}
          initialValues={{ title: todo.title }}
          onFinish={finishEditing}
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
              <Input />
            </Form.Item>
            <Button onClick={handleCloseEditing} type="primary" danger>
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
              onChange={() => toogleTask(todo.id, todo)}
              className={styles.input}
            />
            <Text
=======
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
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "#a8a8a8" : "black",
              }}
            >
              {todo.title}
<<<<<<< HEAD
            </Text>
          </Space>

          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditId(true)}
            />

            <Button
              type="primary"
              danger
              onClick={() => handleDeleteTask(todo.id)}
              icon={<DeleteOutlined />}
            />
=======
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
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
          </div>
        </>
      )}
    </>
  );
};

export default Task;

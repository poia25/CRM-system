import { deleteTask, editCheckBox, updateTask } from "../../api/api";
import styles from "./List.module.css";
import { Button, Checkbox, Space, Typography, Form, Input } from "antd";
import { Todo } from "../../types/todo";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
      await editCheckBox(id, !task.isDone);
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
              icon={<EditOutlined />}
              onClick={() => setIsEditId(true)}
            />

            <Button
              type="primary"
              danger
              onClick={() => handleDeleteTask(todo.id)}
              icon={<DeleteOutlined />}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Task;

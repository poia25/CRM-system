import React from "react";
import { addTask } from "../../api/api";
<<<<<<< HEAD
import { Button, Form, Input } from "antd";

export interface TodoFormProps {
  loadTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = React.memo(({ loadTodos }) => {
  const [form] = Form.useForm();

  const handleAddTask = async (values: { task: string }) => {
    try {
      await addTask({ title: values.task, isDone: false });
      await loadTodos();
      form.resetFields();
    }catch(error) {
      console.log("Проблемы формы",error)
=======
import styles from "./Form.module.css";
interface TodoFormProps {
  loadTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ loadTodos }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.length > 2 && newTask.length < 64) {
      await addTask({ title: newTask, isDone: false });
      await loadTodos();
      setNewTask("");
    } else {
      alert("Некорректное количество символов");
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
    }
  };

  return (
    <>
<<<<<<< HEAD
      <Form onFinish={handleAddTask} form={form}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Form.Item
            name="task"
            rules={[
              { required: true, message: "Input is required!" },
              { min: 2, message: "Input must be at least 3 characters long!" },
              { max: 64, message: "Input cannot exceed 64 characters!" },
            ]}
          >
            <Input placeholder="Add a new task" style={{ width: "300px" }} />
          </Form.Item>
          <Button htmlType="submit" type="primary" size="middle">
            Add
          </Button>
        </div>
      </Form>
=======
      <form onSubmit={handleAddTask} className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add</button>
      </form>
>>>>>>> bc0aca1b8a114f6ce7f2a8d9c4cef13ce3d90190
    </>
  );
});

export default TodoForm;

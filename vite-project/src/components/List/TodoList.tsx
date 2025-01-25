import { useState } from "react";
import { Todo } from "../../types/todo.ts";
import Task from "./Task.tsx";
import { updateTask } from "../../api/api.ts";
import styles from "./List.module.css";
import { Button, Form, Input, Space } from "antd";

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

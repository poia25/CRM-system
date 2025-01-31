import { useState } from "react";
import { addTask } from "../../api/api";
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
    }
  };

  return (
    <>
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
    </>
  );
};

export default TodoForm;

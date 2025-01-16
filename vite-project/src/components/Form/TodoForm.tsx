import { useState } from "react";
import { addTask } from "../../api/api";
import { Todo } from "../../types/todo";
import styles from "./Form.module.css";
interface TodoFormProps {
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
  loadTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ setData, loadTodos }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.length > 2 && newTask.length < 64) {
      const NewTask = await addTask({ title: newTask, isDone: false });
      setData((prevData) => [...prevData, NewTask]);
      loadTodos();
      setNewTask("");
    }else{
      alert('Некорректное количество символов')
    }
  };

  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button onClick={handleAddTask} className={styles.button}>
          Add
        </button>
      </form>
    </>
  );
};

export default TodoForm;

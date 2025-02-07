import Task from "./Task.tsx";
import styles from "./List.module.css";
import { Todo } from "../../types/todo.ts";

export interface TodoListProps {
  todos: Todo[];
  loadTodos: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loadTodos }) => {
  return (
    <div>
      <ul className={styles.list}>
        {todos?.map((todo) => (
          <li key={todo.id} className={styles.taskItem}>
            <>
              <Task todo={todo} data={todos} loadTodos={loadTodos} />
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
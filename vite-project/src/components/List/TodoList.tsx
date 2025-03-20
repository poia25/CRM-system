import React from "react";
import Task from "./Task.tsx";
import { Todo } from "../../types/todo.ts";
import { List } from "antd";

export interface TodoListProps {
  todos: Todo[];
  loadTodos: () => void;
}
const TodoList: React.FC<TodoListProps> = React.memo(({ todos, loadTodos }) => {
  return (
    <div>
      <List
        dataSource={todos}
        size="large"
        renderItem={(todo) => (
          <List.Item>
            <Task todo={todo} loadTodos={loadTodos} />
          </List.Item>
        )}
      />
    </div>
  );
});

export default TodoList;
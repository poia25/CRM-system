import React from "react";
import { TodoStatus } from "../../types/todo.ts";
import { TodoInfo } from "../../types/todo.ts";
import ButtonAll from "./ButtonAll.tsx";
import styles from "./Tabs.module.css";

interface TodoListProps {
  info: TodoInfo;
  activeTab: TodoStatus;
  setActiveTab: (tab: TodoStatus) => void;
}

const Tabs: React.FC<TodoListProps> = ({ info, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <ButtonAll
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        info={info}
      />
    </div>
  );
};

export default Tabs;

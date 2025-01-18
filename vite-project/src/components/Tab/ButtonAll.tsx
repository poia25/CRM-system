import { TodoStatus } from "../../types/todo.ts";
import { TodoInfo } from "../../types/todo.ts";
import styles from "./Tabs.module.css";

interface ButtonProps {
  setActiveTab: (tab: TodoStatus) => void;
  activeTab: TodoStatus;
  info: TodoInfo;
}

const ButtonAll: React.FC<ButtonProps> = ({
  setActiveTab,
  activeTab,
  info,
}) => {
  return (
    <div>
      <button
        className={styles.button}
        onClick={() => setActiveTab(TodoStatus.All)}
        style={{
          fontWeight: activeTab === "all" ? "bold" : "normal",
          color: activeTab === "all" ? "#1b8bd6" : "#727272",
          borderBottom: activeTab === "all" ? "2px solid #1b8bd6" : "none",
        }}
      >
        Все<span>({info.all})</span>
      </button>
      <button
        className={styles.button}
        onClick={() => setActiveTab(TodoStatus.Completed)}
        style={{
          fontWeight: activeTab === "completed" ? "bold" : "normal",
          color: activeTab === "completed" ? "#1b8bd6" : "#727272",
          borderBottom:
            activeTab === "completed" ? "2px solid #1b8bd6" : "none",
        }}
      >
        в работе<span>({info.inWork})</span>
      </button>
      <button
        className={styles.button}
        onClick={() => setActiveTab(TodoStatus.Pending)}
        style={{
          fontWeight: activeTab === "pending" ? "bold" : "normal",
          color: activeTab === "pending" ? "#1b8bd6" : "#727272",
          borderBottom: activeTab === "pending" ? "2px solid #1b8bd6" : "none",
        }}
      >
        сделано<span>({info.completed})</span>
      </button>
    </div>
  );
};

export default ButtonAll;

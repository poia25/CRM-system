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
        className={`${(styles.tab, styles.button)} ${
          activeTab === "all" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab(TodoStatus.All)}
      >
        Все({info.all})
      </button>
      <button
        className={`${(styles.tab, styles.button)} ${
          activeTab === "completed" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab(TodoStatus.Completed)}
      >
        в работе({info.inWork})
      </button>
      <button
        className={`${(styles.tab, styles.button)} ${
          activeTab === "pending" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab(TodoStatus.Pending)}
      >
        сделано({info.completed})
      </button>
    </div>
  );
};

export default ButtonAll;

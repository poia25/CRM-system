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
          activeTab === TodoStatus.All ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab(TodoStatus.All)}
      >
        Все({info.all})
      </button>
      <button
        className={`${(styles.tab, styles.button)} ${
          activeTab === TodoStatus.Pending ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab(TodoStatus.Pending)}
      >
        в работе({info.inWork})
      </button>

      <button
        className={`${(styles.tab, styles.button)} ${
          activeTab === TodoStatus.Completed ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab(TodoStatus.Completed)}
      >
        сделано({info.completed})
      </button>
    </div>
  );
};

export default ButtonAll;

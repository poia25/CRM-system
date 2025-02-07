import React from "react";
import styles from "./Tabs.module.css";
import { TodoInfo, TodoStatus } from "../../types/todo.ts";
import { Button, Space } from "antd";

interface TabsProps {
  info: TodoInfo;
  activeTab: TodoStatus;
  setActiveTab: (tab: TodoStatus) => void;
}

const Tabs: React.FC<TabsProps> = ({ info, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <Space>
        <Button
          onClick={() => setActiveTab(TodoStatus.All)}
          type={activeTab === TodoStatus.All ? "primary" : "default"}
        >
          Все({info.all})
        </Button>

        <Button
          onClick={() => setActiveTab(TodoStatus.Pending)}
          type={activeTab === TodoStatus.Pending ? "primary" : "default"}
        >
          в работе({info.inWork})
        </Button>

        <Button
          onClick={() => setActiveTab(TodoStatus.Completed)}
          type={activeTab === TodoStatus.Completed ? "primary" : "default"}
        >
          сделано({info.completed})
        </Button>
      </Space>
    </div>
  );
};

export default Tabs;
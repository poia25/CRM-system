import React from "react";
import styles from "./Tabs.module.css";
import { TodoInfo, TodoStatus } from "../../types/todo.ts";
import { Segmented } from "antd";

interface TabsProps {
  info: TodoInfo;
  activeTab: TodoStatus;
  setActiveTab: (tab: TodoStatus) => void;
}

const Tabs: React.FC<TabsProps> = ({ info, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <Segmented
        options={[
          {
            label: `Все (${info.all})`,
            value: TodoStatus.All,
          },
          {
            label: `В работе (${info.inWork})`,
            value: TodoStatus.Pending,
          },
          {
            label: `Сделано (${info.completed})`,
            value: TodoStatus.Completed,
          },
        ]}
        value={activeTab}
        onChange={(value) => setActiveTab(value)}
      />
    </div>
  );
};

export default Tabs;

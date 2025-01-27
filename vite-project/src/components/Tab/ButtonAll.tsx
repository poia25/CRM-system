import { TodoStatus } from "../../types/todo.ts";
import { TodoInfo } from "../../types/todo.ts";
import { Button, Space } from "antd";

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
    <Space>
      <Button
        onClick={() => setActiveTab(TodoStatus.All)}
        type={activeTab === TodoStatus.All ? "primary" : "default"}
      >
        Все({info.all})
      </Button>

      <Button
        onClick={() => setActiveTab(TodoStatus.Completed)}
        type={activeTab === TodoStatus.Completed ? "primary" : "default"}
      >
        в работе({info.inWork})
      </Button>

      <Button
        onClick={() => setActiveTab(TodoStatus.Pending)}
        type={activeTab === TodoStatus.Pending ? "primary" : "default"}
      >
        сделано({info.completed})
      </Button>
    </Space>
  );
};

export default ButtonAll;

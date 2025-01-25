import { addTask } from "../../api/api";
import { Todo } from "../../types/todo";
import { Button, Form, Input } from "antd";
interface TodoFormProps {
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
  loadTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ setData, loadTodos }) => {
  const [form] = Form.useForm();

  const handleAddTask = async (values: { task: string }) => {
    const NewTask = await addTask({ title: values.task, isDone: false });
    setData((prevData) => [...prevData, NewTask]);
    loadTodos();
    form.resetFields();
  };

  return (
    <>
      <Form onFinish={handleAddTask} form={form}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Form.Item
            name="task"
            rules={[
              { required: true, message: "Input is required!" },
              { min: 2, message: "Input must be at least 3 characters long!" },
              { max: 64, message: "Input cannot exceed 64 characters!" },
            ]}
          >
            <Input
              placeholder="Add a new task"
              style={{ width: "300px" }}
            ></Input>
          </Form.Item>
          <Button htmlType="submit" type="primary" size="middle">
            Add
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TodoForm;

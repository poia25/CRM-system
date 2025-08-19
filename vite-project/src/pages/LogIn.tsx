import { Flex, Form, Input, Button, Space, message } from "antd";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthData } from "../types/user";
import { useAppDispatch } from "../store/store";
import { loginUser } from "../store/actionCreators";

const { Title } = Typography;

export const LogIn: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  

  const onFinishHandleLogin = async (values: AuthData) => {
    try {
      await dispatch(loginUser(values));
       navigate('/todo');
    } catch (error) {
      message.error("Неверный Логин или Пароль");
      throw error;
    }
  };

  return (
    <>
      <Flex gap="large" align="center" style={{ width: "100%" }}>
        <Flex style={{ margin: "0 auto" }}>
          <Form form={form} onFinish={onFinishHandleLogin}>
            <Title level={3} style={{ marginBottom: 30, textAlign: "center" }}>
              Login to your Account
            </Title>
            <Form.Item
              name="login"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input placeholder="mail@abc.com" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input type="password" placeholder="***********" />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>

            <Space>
              <Typography.Text>Not Registered Yet?</Typography.Text>
              <Link to={`/auth/register`}>Create an account</Link>
            </Space>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

export default LogIn;

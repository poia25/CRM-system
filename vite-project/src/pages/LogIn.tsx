import { Flex, Form, Input, Button, Space } from "antd";
import { Typography } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthData } from "../types/user";
import { RootState, useAppDispatch } from "../store/store";
import { loginUser } from "../store/actionCreators";
import { useSelector } from "react-redux";

const { Title } = Typography;

export const LogIn: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinishHandleLogin = async (values: AuthData) => {
    try {
      await dispatch(loginUser(values));
      navigate("/todo");
    } catch (error) {
    alert('Неверные логин или пароль')
      throw error;
    }
  };

  const isLogged = useSelector(
    (state: RootState) => !!state.auth.profileData.profile
  );

  return isLogged ? (
    <Navigate to="/todo" replace />
  ) : (
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
              <Button
                block
                type="primary"
                htmlType="submit"
              >
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

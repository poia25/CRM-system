import { Flex, Form, Input, Button, Space } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthData } from "../types/user";
import { RootState, useAppDispatch } from "../store/store";
import { loginUser } from "../store/actionCreators";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;

export const LogIn = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: RootState) => state.auth.authState);

  const onFinishHandleLogin = async (values: AuthData) => {
    try {
      await dispatch(loginUser(values));
      navigate('/')  //настроить APP что бы был перход

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data === "Invalid credentials\n") {
          form.setFields([
            { name: "password", errors: ["Неверные логин или пароль"] },
          ]);
        }
      }
      throw error
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
              <Flex justify="end" align="center">
                <a href="">Forgot password?</a>
              </Flex>
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{ margin: "20px 0" }}
              >
                Log in
              </Button>
            </Form.Item>

            <Space>
              <Typography.Text>Not Registered Yet?</Typography.Text>
              <Link to={`/signup`}>Create an account</Link>
            </Space>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

export default LogIn;

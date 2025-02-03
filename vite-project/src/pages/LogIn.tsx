import { Flex, Form, Input, Checkbox, Button, Space } from "antd";
import { Typography } from "antd";
import { Link } from 'react-router-dom';

const { Title } = Typography;

export const LogIn = () => {
  return (
    <>
      <Flex gap="large" align="center" style={{ width: "100%" }}>
        <Flex style={{ margin: "0 auto" }}>
          <Form>
            <Title level={3} style={{ marginBottom: 30, textAlign: "center" }}>
              Login to your Account
            </Title>
            <Form.Item
              name="Email"
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
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
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

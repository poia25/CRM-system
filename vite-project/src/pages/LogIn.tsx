import { Flex, Form, Input, Checkbox, Button } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

export const LogIn = () => {
  return (
    <>
      <Flex gap="large" align="center" style={{ width: "100%" }}>
        <img style={{ height: "100vh" }} src="/image/login.png" />
        <Flex style={{ margin: "0 auto" }}>
          <Form>
            <Title level={3} style={{ marginBottom: 30, textAlign: "center" }}>
              Login to your Account
            </Title>
            <Form.Item
              label="Email"
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
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{ margin: "20px 0" }}
              >
                Log in
              </Button>
              Not Registered Yet? <a href="">Create an account</a>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

export default LogIn;

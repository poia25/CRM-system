import { Flex, Form, Input, Button, Typography,message } from "antd";
import { userRegistr } from "../api/auth.ts";
import { UserRegistration } from "../types/user.ts";
import { useState } from "react";
import { Link } from "react-router";

export const SignUpPage = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinishHandler = async (values: UserRegistration) => {
    if(values.phoneNumber === ""){
      values.phoneNumber = "+"
    } 
    try {
      await userRegistr({ ...values});
      console.log(values.phoneNumber,values)
      setSuccess(true);
    } catch (error: unknown) {
      message.error("Такой логин или почта уже существуют!")
      throw error;
    }
  };

  return success ? (
    <>
      <Typography>
        Вы успешно зарегистрировались. Теперь можно войти в систему
      </Typography>
      <Link to={`/auth`}>Вход</Link>
    </>
  ) : (
    <>
      <Flex gap="large" align="center" style={{ width: "100%" }}>
        <Flex style={{ margin: "0 auto" }}>
          <Form
            form={form}
            name="registration"
            layout="vertical"
            onFinish={onFinishHandler}
          >
            <Form.Item
              name="username"
              label="Имя пользователя"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя пользователя",
                },
                {
                  min: 1,
                  max: 60,
                  message: "Длина должна быть от 1 до 60 символов",
                },
                {
                  pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                  message: "Только буквы русского и латинского алфавита",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="login"
              label="Логин"
              validateDebounce={1000}
              rules={[
                { required: true, message: "Пожалуйста, введите логин" },
                {
                  min: 2,
                  max: 60,
                  message: "Длина должна быть от 2 до 60 символов",
                },
                { pattern: /^[a-zA-Z]+$/, message: "Только латинские буквы" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              validateDebounce={1000}
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
                {
                  min: 6,
                  max: 60,
                  message: "Длина должна быть от 6 до 60 символов",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Повторите пароль"
              dependencies={["password"]}
              validateDebounce={1000}
              rules={[
                { required: true, message: "Пожалуйста, повторите пароль" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="email"
              label="Почтовый адрес"
              validateDebounce={1000}
              rules={[
                { required: true, message: "Пожалуйста, введите email" },
                { type: "email", message: "Неправильный формат email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Телефон"
              validateDebounce={1000}
              rules={[
                {
                  pattern: /^[1-9]\d{0,10}$/,
                  message: "Неправильный формат телефона",
                },
              ]}
            >
              <Input
                addonBefore="+7"
                maxLength={10}
                placeholder="9999999999"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

export default SignUpPage;

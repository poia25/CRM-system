import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router";
import {
  retrieveUserProfile,
  updateUserProfile,
} from "../api/auth";
// import { Roles } from "../types/admin";
import { ProfileRequest } from "../types/user";

// interface DataType {
//   id: number;
//   username: string;
//   email: string;
//   date: string; // ISO date string
//   isBlocked: boolean;
//   roles: Roles[];
//   phoneNumber: string;
// }

export const UserProfilePage = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [user, setUser] = useState<ProfileRequest | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const userId = Number(id);

  useEffect(() => {
    async function getUserData() {
      const responseUserInfo = await retrieveUserProfile(userId);
      setUser(responseUserInfo.data);
    }
    getUserData();
  }, [id]);


  const onFinishHandler = async (values: ProfileRequest) => {
    if (values.email === user?.email && values.username === user?.username) {
      setIsEdit(false);
      form.resetFields();
      return;
    }
    try {
      if (user && id) {
        let newId = +id
        const updateUser = await updateUserProfile(newId, values);
        setUser(updateUser)
        setIsEdit(false);
        form.resetFields();
      }
    } catch {
      console.log("ОШИБКА ПУТ ЗАПРОСА");
    }
  };
  const handleCloseEditing = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleBackUser = () => {
    navigate(-1);
  };

  const userPhoneNumber = () => {
    if(user?.phoneNumber){
      return user?.phoneNumber.slice(1)
    }
  }
  return (
    <>
      {isEdit ? (
        <Form
          initialValues={{
            username: user?.username,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
          }}
          onFinish={onFinishHandler}
          form={form}
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
                pattern: /^\+[1-9]\d{1,14}$/,
                message: "Неправильный формат телефона",
              },
            ]}
          >
            <Input maxLength={10} style={{ width: "100%" }} />
          </Form.Item>
          <Button htmlType="submit">Сохранить</Button>
          <Button onClick={handleCloseEditing}>Отмена</Button>
        </Form>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 10 }}>
            <li>Имя полььзователя: {user?.username}</li>
            <li>Почтовый адрес: {user?.email}</li>
            <li>Телефон:+7{userPhoneNumber()}</li>
          </ul>
          <Button onClick={() => setIsEdit(true)}>Редактировать</Button>
          <Button onClick={() => navigate("/users")}>Сохранить</Button>
          <Button onClick={handleBackUser}>Вернуться</Button>
        </>
      )}
    </>
  );
};

export default UserProfilePage;

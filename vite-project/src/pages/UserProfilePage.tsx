import { Button, Form, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router";
import { retrieveUserProfile, updateUserProfile } from "../api/auth";
import { ProfileRequest } from "../types/user";

export const UserProfilePage = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [user, setUser] = useState<ProfileRequest | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const initialValues = useRef<Partial<ProfileRequest> | null>(null);

  const userId = Number(id);

  useEffect(() => {
    async function getUserData() {
      const responseUserInfo = await retrieveUserProfile(userId);
      setUser(responseUserInfo.data);
    }
    getUserData();
  }, [id]);

  useEffect(() => {
    if (user) {
      initialValues.current = { ...user };
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const getChangedProfileFields = (
    original: Partial<ProfileRequest>,
    current: Partial<ProfileRequest>
  ): Partial<ProfileRequest> => {
    const changes: Partial<ProfileRequest> = {};

    const keys: Array<keyof ProfileRequest> = [
      "username",
      "email",
      "phoneNumber",
    ];

    keys.forEach((key) => {
      if (current[key] !== original[key]) {
        changes[key] = current[key];
      }
    });

    return changes;
  };

  const onFinishHandler = async (values: Partial<ProfileRequest>) => {
    if (!initialValues.current) {
      message.error("Данные пользователя не загружены");
      return;
    }

    const changedData = getChangedProfileFields(initialValues.current, values);
    console.log("Changed data:", changedData);

    if (Object.keys(changedData).length === 0) {
      message.info("Нет изменений для сохранения");
      return;
    }

    try {
      const updateUser = await updateUserProfile(userId, changedData);
      setUser(updateUser);
      initialValues.current = { ...updateUser };
      setIsEdit(false);
      message.success("Данные успешно обновлены");
    } catch (error) {
      message.error("Ошибка при обновлении данных");
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
    if (user?.phoneNumber) {
      return user?.phoneNumber.slice(1);
    }
  };
  return (
    <>
      {isEdit ? (
        <Form
          initialValues={initialValues}
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

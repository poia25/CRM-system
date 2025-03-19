import { useEffect, useState } from "react";
import { ProfileRequest } from "../types/user.ts";
import { getUpdateProfile, logoutUser } from "../store/actionCreators";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { Button, Form, Input } from "antd";
import { loadProfile } from "../api/auth.ts";
import { loadProfileSuccess } from "../store/authReducer.ts";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile
  );
  const isLogin = useSelector(
    (state: RootState) => state.auth.authData.isAuthorizated
  );
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  
  const onFinishHandler = (values: ProfileRequest) => {
    if (
      values.email === profile?.email ||
      values.username === profile?.username
    ) {
      setIsEdit(false);
      form.resetFields()
      return;
    }
    try {
      dispatch(getUpdateProfile(values));
    } catch {
      console.log("ОШИБКА ПУТ ЗАПРОСА");
    }
  };

  const handleCloseEditing = () => {
    setIsEdit(false);
    form.resetFields()
  }

  useEffect(() => {
    const loadProfileProg = async () => {
      loadProfile()
      let res = await loadProfile();
      if(res){
        dispatch(loadProfileSuccess(res));
      }
    } 
    loadProfileProg()
  }, [isLogin]);

  return (
    <>
      {isEdit ? (
        <Form
          initialValues={{
            username: profile?.username,
            email: profile?.email,
            phoneNumber: profile?.phoneNumber.slice(1),
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
                pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                message: "Неправильный формат телефона",
              },
            ]}
          >
            <Input addonBefore="+7" maxLength={10} style={{ width: "100%" }} />
          </Form.Item>
          <Button htmlType="submit">Сохранить</Button>
          <Button onClick={handleCloseEditing}>Отмена</Button>
        </Form>
      ) : (
        <>
          <ul style={{ listStyle: "none" }}>
            <li>Имя полььзователя: {profile?.username}</li>
            <li>Почтовый адрес: {profile?.email}</li>
            <li>Телефон:+7{profile?.phoneNumber.slice(1)}</li>
          </ul>
          <Button onClick={() => setIsEdit(true)}>Редактировать</Button>
          <Button
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            ВЫЙТИ
          </Button>
        </>
      )}
    </>
  );
};

export default ProfilePage;

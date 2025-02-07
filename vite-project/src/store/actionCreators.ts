import { Dispatch } from "@reduxjs/toolkit";
import { AuthData, Token } from "../types/user";
import {
  loginFailure,
  loginStart,
  loginSucces,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
} from "./authReducer";
import { loadProfile, login } from "../api/auth";

export const loginUser = (data: AuthData) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart()); // Начало запроса

      const res: Token = await login(data); // Отправляем запрос на сервер

      // Сохраняем токены
      if (!res || !res.accessToken) {
        throw new Error("Отсутствует токен в ответе сервера");
      }
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      dispatch(loginSucces(res.accessToken)); // Диспатчим успешный вход
    } catch (error: any) {
      dispatch(loginFailure(error.message)); // Обрабатываем ошибку
      throw error;
    }
  };
};

export const getProfile = () => async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart());
      const res = await loadProfile();
      dispatch(loadProfileSuccess(res));
    } catch (error: any) {
      dispatch(loadProfileFailure(error.message));
      throw error;
    }
  };

import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AuthData, Profile, ProfileRequest, Token } from "../types/user";
import {
  loginFailure,
  loginStart,
  loginSucces,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutSucces,
} from "./authReducer";
import {
  loadProfile,
  login,
  logout,
  updateProfile,
} from "../api/auth";
import TokenService from "../services/tokenServices";

export const loginUser = (data: AuthData) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const res: Token = await login(data);
      if (!res || !res.accessToken) {
        throw new Error("Отсутствует токен в ответе сервера");
      }
      TokenService.saveToken(res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      dispatch(loginSucces(res.accessToken));
      dispatch(getProfile() as unknown as UnknownAction);
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};

export const getProfile =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart());
      const res = await loadProfile();
      if (res) {
        dispatch(loadProfileSuccess(res));
      }
    } catch (error: any) {
      dispatch(loadProfileFailure(error.message));
      throw error;
    }
  };

export const getUpdateProfile =
  (values: ProfileRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart());
      const res = await updateProfile(values);
      dispatch(loadProfileSuccess(res as Profile));
      dispatch(getProfile() as unknown as UnknownAction);
    } catch (error: any) {
      dispatch(loadProfileFailure(error.message));
      throw error;
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      localStorage.clear();
      TokenService.deleteToken();
      dispatch(logoutSucces());
      await logout();
      window.location.href = "/auth";
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

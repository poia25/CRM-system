import { Dispatch } from "@reduxjs/toolkit";
import { AuthData, ProfileRequest } from "../types/user";
import {
  loginFailure,
  loginStart,
  loginSucces,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutSucces,
} from "./authReducer";
import { loadProfile, login, logout, updateProfile } from "../api/auth";
import TokenService from "../services/tokenServices";
import { BaseUser } from "../types/admin";
import { AppDispatch } from "./store";

export const loginUser = (data: AuthData) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const res = await login(data);
      if (!res || !res.accessToken) {
        throw new Error("Отсутствует токен в ответе сервера");
      }
      TokenService.saveToken(res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      dispatch(loginSucces(res.accessToken));
      dispatch(getProfile());
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loginFailure(error.message));
        throw error;
      }
    }
  };
};

export const getProfile =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart());
      const res = await loadProfile();
      if (res) {
        dispatch(loadProfileSuccess(res));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loadProfileFailure(error.message));
        throw error;
      }
    }
  };

export const getUpdateProfile =
  (values: ProfileRequest) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart());
      const res = await updateProfile(values);
      dispatch(loadProfileSuccess(res as BaseUser));
      dispatch(getProfile());
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loadProfileFailure(error.message));
        throw error;
      }
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

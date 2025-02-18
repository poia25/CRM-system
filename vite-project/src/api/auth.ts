import axios, { AxiosResponse } from "axios";
import {
  UserRegistration,
  Token,
  AuthData,
  Profile,
  ProfileRequest,
} from "../types/user";
import TokenService from "../services/tokenServices";
import { getNewAccessToken } from "../store/actionCreators";
import { store } from "../store/store";
import { logoutSucces } from "../store/authReducer";

export const axiosInstancePublic = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url && config.url === "/auth/signin") {
    return config;
  }

  const token = TokenService.getToken();

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response?.status === 401 && TokenService.getRefreshToken()) {
        await store.dispatch(getNewAccessToken());
        return;
      }
    } catch (error) {
      store.dispatch(logoutSucces());
      throw error;
    }
  }
);

export const userRegistr = async (
  userData: UserRegistration
): Promise<Token> => {
  const response = await axiosInstancePublic.post(`/auth/signup`, userData);
  return response.data;
};
export const login = async (userLog: AuthData): Promise<Token> => {
  const response = await axiosInstance.post(`/auth/signin`, userLog);
  return response.data;
};
export const loadProfile = async (): Promise<Profile | null> => {
  const token = TokenService.getToken();
  if (!token) {
    return null;
  }
  try {
    const response = await axiosInstance.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.log("Ошибка при загрузке профиля", error);
    throw error;
  }
};
export const refreshToken = async (refreshToken: string): Promise<Token> => {
  const response = await axiosInstancePublic.post("/auth/refresh", {
    refreshToken: refreshToken,
  });
  return response.data;
};
export const logout = async (): Promise<AxiosResponse> => {
  const response = await axiosInstance.post(`/user/logout`);
  return response;
};
export const updateProfile = async (
  value: ProfileRequest
): Promise<ProfileRequest> => {
  const response = await axiosInstance.put("/user/profile", value);
  return response.data;
};

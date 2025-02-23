import axios, { AxiosResponse } from "axios";
import {
  UserRegistration,
  Token,
  AuthData,
  Profile,
  ProfileRequest,
} from "../types/user";
import TokenService from "../services/tokenServices";
import { logoutUser } from "../store/actionCreators";
import { store } from "../store/store";

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
  const token = TokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    const refreshToken = TokenService.getRefreshToken();
    if (!refreshToken) {
      store.dispatch(logoutUser());
      return Promise.reject(error);
    }

    try {
      const response = await axios.post<Token>(
        "https://easydev.club/api/v1/auth/refresh",
        { refreshToken }
      );

      const newAccessToken = response.data.accessToken;

      TokenService.saveToken(newAccessToken);
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(error.config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export const userRegistr = async (
  userData: UserRegistration
): Promise<Profile> => {
  const response = await axiosInstancePublic.post(`/auth/signup`, userData);
  return response.data;
};
export const login = async (userLog: AuthData): Promise<Token> => {
  const response = await axiosInstance.post(`/auth/signin`, userLog);
  return response.data;
};
export const loadProfile = async (): Promise<Profile | null> => {
  try {
    const response = await axiosInstance.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.log("Ошибка при загрузке профиля", error);
    throw error;
  }
};
export const refreshToken = async (refreshToken: string): Promise<Token> => {
  const response = await axios.post(
    "https://easydev.club/api/v1/auth/refresh",
    { refreshToken }
  );
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

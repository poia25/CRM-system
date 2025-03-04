import axios, { AxiosResponse } from "axios";
import {
  UserRegistration,
  Token,
  AuthData,
  Profile,
  ProfileRequest,
} from "../types/user";
import TokenService from "../services/tokenServices";
import {
  getProfile,
  logoutUser,
} from "../store/actionCreators";
import { store } from "../store/store";
import { loginSucces, logoutSucces } from "../store/authReducer";

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
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log(1)
      originalRequest._retry = true;
      console.log(2)
      try {
        console.log(3)
        const refreshToken = TokenService.getRefreshToken();
        console.log(4)
        
        if (refreshToken) {
          const response = await authRefreshToken(refreshToken);
          console.log(5)
          
          TokenService.saveToken(response.accessToken);
          store.dispatch(loginSucces(response.accessToken));

          localStorage.setItem("refreshToken", response.refreshToken);

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.accessToken}`;
          store.dispatch(getProfile());
        }else{
          localStorage.clear();
          TokenService.deleteToken();
          store.dispatch(logoutSucces());
          window.location.href = "/auth";
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        console.log('EXIT')
        store.dispatch(logoutUser())

        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
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
export const authRefreshToken = async (
  refreshToken: string
): Promise<Token> => {
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

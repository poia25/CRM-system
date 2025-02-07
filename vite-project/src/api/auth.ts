import axios, { AxiosResponse, RawAxiosRequestConfig } from "axios"; 
import {UserRegistration, Token,AuthData, Profile} from "../types/user"

export const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const axiosInstancePublic = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Автоматически добавляем токен ко всем запросам
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstancePublic.interceptors.response.use(
  (response) => response, // Если ответ нормальный, ничего не делаем
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Токен истёк, пробуем обновить...");
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await axios.post("https://easydev.club/api/v1/auth/refresh", {
            refreshToken: refreshToken,
          });
          
          // Сохраняем новый accessToken
          localStorage.setItem("accessToken", res.data.accessToken);
          
          // Повторяем оригинальный запрос с новым токеном
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error("Не удалось обновить токен, выполняем логаут");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Перенаправляем на страницу логина
        }
      }
    }
    return Promise.reject(error);
  }
);



export const userRegistr = async (userData: UserRegistration): Promise<Token> => {
    const response = await axiosInstancePublic.post(`/auth/signup`, userData);
  return response.data;
}
export const login = async (userLog: AuthData): Promise<Token> => {
    const response = await axiosInstancePublic.post(`/auth/signin`, userLog);
  return response.data;
}
export const loadProfile = async (): Promise<Profile> => {
    const response = await axiosInstancePublic.get(`/user/profile`);
  return response.data;
}
export const logout = async (): Promise<AxiosResponse> => {
    const response = await axiosInstancePublic.post(`/user/logout`);
  return response;
}
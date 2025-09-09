import axios, { AxiosResponse } from "axios";
import {
  UserRegistration,
  Token,
  AuthData,
  Profile,
  ProfileRequest,
} from "../types/user";
import TokenService from "../services/tokenServices";
import { getProfile, logoutUser } from "../store/actionCreators";
import { store } from "../store/store";
import { loginSucces, logoutSucces } from "../store/authReducer";
import { BaseUser, FilterType, UserRolesRequest } from "../types/admin";

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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = TokenService.getRefreshToken();

        if (refreshToken) {
          promiseRefreshToken();
          store.dispatch(getProfile());
          return axiosInstance(originalRequest);
        } else {
          localStorage.clear();
          TokenService.deleteToken();
          store.dispatch(logoutSucces());
          window.location.href = "/auth";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        console.log("EXIT");
        store.dispatch(logoutUser());

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const promiseRefreshToken = async () => {
  let refreshToken = TokenService.getRefreshToken();
  if (refreshToken) {
    const response = await authRefreshToken(refreshToken);

    TokenService.saveToken(response.accessToken);
    store.dispatch(loginSucces(response.accessToken));

    localStorage.setItem("refreshToken", response.refreshToken);

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.accessToken}`;
  }
};

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
export const loadProfile = async (): Promise<BaseUser | null> => {
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

//ADMIN PANEL

export const getUsersProfile = async (pageSize: number, current: number) => {
  const response = await axiosInstance.get(
    `/admin/users?limit=${pageSize}&offset=${current}`
  );
  return response;
};

export const getFilterData = async (filter: FilterType) => {
  const queryParams: Record<string, string> = {};
  const stringKeys: Array<keyof FilterType> = [
    "search",
    "sortBy",
    "sortOrder",
    "limit",
    "offset",
  ];

  stringKeys.forEach((key) => {
    if (filter[key]) {
      queryParams[key] = String(filter[key]);
    }
  });
  if (filter.isBlocked !== null && filter.isBlocked !== undefined) {
    queryParams.isBlocked = String(filter.isBlocked);
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await axiosInstance.get(`/admin/users?${queryString}`);
  return response;
};

export const getApiData = async (url: string) => {
  const response = await axios.get(url);
  return response;
};

export const retrieveUserProfile = async (id: number) => {
  const response = await axiosInstance.get(`/admin/users/${id}`);
  return response;
};

export const updateUserProfile = async (
  id: number,
  values: ProfileRequest
): Promise<ProfileRequest> => {
  try {
    const response = await axiosInstance.put(`/admin/users/${id}`, values);
    return response.data;
  } catch (error) {
    console.log("Неполучилось обновить пользователя");
    throw error;
  }
};

export const blockUser = async (id: number): Promise<AxiosResponse> => {
  const response = await axiosInstance.post(`/admin/users/${id}/block`);
  return response;
};
export const unLockUser = async (id: number): Promise<AxiosResponse> => {
  const response = await axiosInstance.post(`/admin/users/${id}/unblock`);
  return response;
};

export const updateUserRoles = async (
  id: number,
  values: UserRolesRequest
): Promise<ProfileRequest> => {
  try {
    const response = await axiosInstance.post(
      `/admin/users/${id}/rights`,
      values
    );
    return response.data;
  } catch (error) {
    console.log("Неполучилось обновить пользователя");
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response;
};

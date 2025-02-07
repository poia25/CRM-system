import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../types/user";

export interface AuthState {
  authData: {
    accessToken: string | null;
    error: string | null;
  };
  profileData: {
    profile: Profile | null;
    error: string | null;
  };
  authState: {
    token: string | null;
    isAuthenticated: boolean;
  }
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    error: null,
  },
  profileData: {
    profile: null,
    error: null,
  },
  authState: {
    token: localStorage.getItem("accessToken"), // Проверяем токен в localStorage
    isAuthenticated: !!localStorage.getItem("accessToken"), // true если токен есть
  },
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: { ...state.authData },
    }),
    loginSucces: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: { ...state.authData, accessToken: action.payload, error: null },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: { ...state.authData, error: action.payload },
    }),
    loadProfileStart: (state): AuthState => ({
      ...state,
      profileData: { ...state.profileData },
    }),
    loadProfileSuccess: (state, action: PayloadAction<Profile>): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        error: null,
      },
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      profileData: { profile: null, error: action.payload },
    }),
    logoutSucces: (): AuthState => initialState,
  },
});

export const { loginStart, loginSucces, loginFailure, logoutSucces,loadProfileStart,loadProfileSuccess, loadProfileFailure } =
  authReducer.actions;
export default authReducer.reducer;

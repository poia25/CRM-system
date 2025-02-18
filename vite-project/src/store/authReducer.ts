import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../types/user";

export interface AuthState {
  authData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
  };
  profileData: {
    profile: Profile | null;
    isLoading: boolean | null;
    error: string | null;
  };
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null,
  },
  profileData: {
    profile: null,
    isLoading: null,
    error: null,
  },
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: { ...state.authData, isLoading: true },
    }),
    loginSucces: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: { ...state.authData, isLoading: false, error: action.payload },
    }),
    loadProfileStart: (state): AuthState => ({
      ...state,
      profileData: { ...state.profileData, isLoading: true },
    }),
    loadProfileSuccess: (state, action: PayloadAction<Profile>): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      profileData: { profile: null, isLoading: false, error: action.payload },
    }),
    logoutSucces: (): AuthState => initialState,
  },
});

export const {
  loginStart,
  loginSucces,
  loginFailure,
  logoutSucces,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
} = authReducer.actions;
export default authReducer.reducer;

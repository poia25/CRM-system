import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseUser} from "../types/admin";

export interface AuthState {
  authData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthorizated: boolean;
  };
  profileData: {
    profile: BaseUser| null;
    isLoading: boolean | null;
    error: string | null;
  };
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null,
    isAuthorizated: false,
  },
  profileData: {
    profile: null,
    isLoading: true,
    error: null,
  },
};


export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: { ...state.authData, isLoading: true,},
      
    }),
    loginSucces: (state, action: PayloadAction<string>): AuthState => {
      return{
        ...state,
        authData: {
          ...state.authData,
          accessToken:action.payload,
          isLoading: false,
          isAuthorizated: true,
          error: null,
        },
      }
    },
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: { ...state.authData, isLoading: false, error: action.payload},
    }),
    loadProfileStart: (state): AuthState => ({
      ...state,
      profileData: { ...state.profileData, isLoading: true },
    }),
    loadProfileSuccess: (state, action: PayloadAction<BaseUser>): AuthState => ({
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
    logoutSucces: (): AuthState => {
      return initialState;
    },
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

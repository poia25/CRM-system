import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { BaseUser } from "../types/admin";

export interface FilterDataType {
  search: string;
  sortBy: string | null;
  sortOrder: string | null ;
  isBlocked: boolean | null;
  limit: number;
  offset: number;
}
export interface AuthState {
  authData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthorizated: boolean;
  };
  profileData: {
    profile: BaseUser | null;
    isLoading: boolean;
    error: string | null;
  };
  filters: FilterDataType;
  totalAmount:number;
}
const initialFilters: FilterDataType = {
  search: "",
  sortBy: "id",
  sortOrder: "asc",
  isBlocked: null,
  limit: 20,
  offset: 0,
};

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
  filters: initialFilters,
  totalAmount:0,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.authData.isLoading = true;
    },
    loginSucces: (state, action: PayloadAction<string>): AuthState => {
      return {
        ...state,
        authData: {
          ...state.authData,
          accessToken: action.payload,
          isLoading: false,
          isAuthorizated: true,
          error: null,
        },
      };
    },
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: { ...state.authData, isLoading: false, error: action.payload },
    }),
    loadProfileStart: (state): AuthState => ({
      ...state,
      profileData: { ...state.profileData, isLoading: true },
    }),
    loadProfileSuccess: (
      state,
      action: PayloadAction<BaseUser>
    ): AuthState => ({
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
    setFilters: (state, action: PayloadAction<Partial<FilterDataType>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateFilter: <K extends keyof FilterDataType>(
      state: Draft<AuthState>,
      action: PayloadAction<{ key: K; value: FilterDataType[K] }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },

    resetFilters: (state) => {
      state.filters = { ...initialFilters };
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filters.offset = 0; 
    },

    setSort: (
      state,
      action: PayloadAction<{ sortBy: string|null; sortOrder: "asc" | "desc" | null  }>
    ) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;

      state.filters.offset = 0
    },
    setLimit: (state, action: PayloadAction<{totalAmount:number}>) =>{
      state.totalAmount = action.payload.totalAmount
    },

    setPagination: (
      state,
      action: PayloadAction<{ limit: number; offset: number }>
    ) => {
      state.filters.limit = action.payload.limit;
      state.filters.offset = action.payload.offset;
    },

    nextPage: (state) => {
      state.filters.offset += state.filters.limit;
    },

    prevPage: (state) => {
      state.filters.offset = Math.max(
        0,
        state.filters.offset - state.filters.limit
      );
    },
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
  setFilters,
  updateFilter,
  resetFilters,
  setPagination,
  setLimit,
  setSearch,
  setSort,
  loadProfileFailure,
} = authReducer.actions;
export default authReducer.reducer;

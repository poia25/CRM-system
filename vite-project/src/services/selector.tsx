import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const memoizedSelectAuthData = createSelector(
  [
    (state: RootState) => state.auth.authData.isLoading,
    (state: RootState) => state.auth.authData.isAuthorizated,
    (state: RootState) => state.auth.profileData.profile,
  ],
  (isLoading, isAuthorized, user) => ({
    isLoading,
    isAuthorized,
    user,
  })
);
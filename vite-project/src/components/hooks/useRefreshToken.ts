import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TokenService from "../../services/tokenServices";
import { promiseRefreshToken } from "../../api/auth";

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refreshToken = TokenService.getRefreshToken();
  

  useEffect(() => {
    const checkAuth = async () => {
      if (refreshToken) {
        try {
          await promiseRefreshToken();
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    };
    checkAuth();
  }, [dispatch, refreshToken]);
};
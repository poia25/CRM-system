import { Menu, Spin } from "antd";
import { Link, Navigate, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import TokenService from "../services/tokenServices";
import { useEffect } from "react";
import { promiseRefreshToken } from "../api/auth";

const MainLayout = () => {
  const ref = TokenService.getRefreshToken();
  const isLogin = useSelector(
    (state: RootState) => state.auth.authData.isAuthorizated
  );
  const isLoading = useSelector(
    (state: RootState) => state.auth.authData.isLoading
  );
  const dispatch = useDispatch();

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/todo">Todo</Link>,
    },
    {
      key: "2",
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      if (ref) {
        try {
          promiseRefreshToken();
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    };
    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return <Spin spinning fullscreen />;
  }
  if (isLogin) {
    return (
      <>
        <Menu
          items={menuItems}
          mode="vertical"
          style={{
            border: "1px solid #f0f0f0",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
            width: 200,
            float: "left",
          }}
        />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/auth" />;
  }
};

export default MainLayout;

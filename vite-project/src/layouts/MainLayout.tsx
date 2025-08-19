import { Menu, Spin } from "antd";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { RootState } from "../store/store";
import { Roles } from "../types/admin";
import { useSelector } from "react-redux";
import { useRefreshToken } from "../components/hooks/useRefreshToken";
import { createSelector } from "@reduxjs/toolkit";
import { memo, useMemo } from "react";
import TokenService from "../services/tokenServices";

const memoizedSelectAuthData = createSelector(
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

const MainLayout = () => {
  const {
    isLoading,
    isAuthorized: isLogin,
    user,
  } = useSelector(memoizedSelectAuthData);
  console.log(TokenService.getToken())

  useRefreshToken();

  if (isLoading) {
    return <Spin spinning fullscreen />;
  }

  if (!isLogin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <NavigationMenu role={user?.roles} />
      <Outlet />
    </>
  );
};

const NavigationMenu = memo(({ role }: { role?: Roles[] }) => {
  const { isAuthorized: _isLogin } = useSelector(
    memoizedSelectAuthData
  );
  const location = useLocation();
  const menuItems: MenuProps["items"] = useMemo(() => {
    const items = [
      {
        key: "todo",
        label: <Link to="/todo">Todo</Link>,
      },
      {
        key: "profile",
        label: <Link to="/profile">Profile</Link>,
      },
    ];

    if (role?.includes(Roles.ADMIN) || role?.includes(Roles.MODERATOR)) {
      items.push({
        key: "users",
        label: <Link to="/users">Users</Link>,
      });
    }

    return items;
  }, [role]);

  const selectedKeys = useMemo(() => {
    const path = location.pathname;
    return menuItems.some((item) => item?.key === path) ? [path] : [];
  }, [location.pathname, menuItems]);

  return (
    <Menu
      items={menuItems}
      mode="vertical"
      selectedKeys={selectedKeys}
      defaultSelectedKeys={["/todo"]}
      className="main-navigation-menu"
      style={{
        border: "1px solid #f0f0f0",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#f0f0f0",
        width: 200,
        float: "left",
      }}
    />
  );
});

export default MainLayout;

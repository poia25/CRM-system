import { Menu, Spin } from "antd";
import { Link, Navigate, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { RootState,  } from "../store/store";
import TokenService from "../services/tokenServices";

const MainLayout = () => {
  const ref = TokenService.getRefreshToken() // а это местный мастхев получается
  // const isLogin = useSelector((state: RootState) => state.auth.authData.isAuthorizated); от нее нет толка тут тк первое что делается при обновление страницы это isLogin = false
  const isLoading = useSelector(
    (state: RootState) => state.auth.authData.isLoading
  );

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
  if (isLoading) {
    return <Spin spinning fullscreen />;
  }
  if (ref) {
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

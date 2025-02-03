import { Menu } from "antd";
import { Link } from "react-router-dom";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";



const Sidebar = () => {

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/">Todo</Link>,
    },
    {
      key: "2",
      label: <Link to="/profile">Profile</Link>,
    },
  ];
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
      
    </>
  );
};

export default Sidebar;

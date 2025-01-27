import {  Space } from "antd";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Space
      direction="vertical"
      style={{
        border: "1px solid #f0f0f0",
        padding: "10px",
        borderRadius: "5px",
        float: "right",
        backgroundColor: "#f0f0f0",
        
      }}
    >
      <Link to="/">Todo</Link>
      <Link to="/profile">Profile</Link>
    </Space>
  );
};

export default Sidebar;

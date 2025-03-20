import { Flex, Image } from "antd";
import { Outlet } from "react-router-dom";
import leftImage from "../assets/illustration.svg";

const container: React.CSSProperties = {
  height: "100vh",
};

const leftColumnStyle: React.CSSProperties = {
  width: "54%",  
};

const rightColumnStyle: React.CSSProperties = {
  width: "46%",
};

export const AuthLayout = () => {
  return (
    <Flex style={container}>
      <Flex style={leftColumnStyle} vertical align="center" justify="center">
        <Image src={leftImage} alt="Illustration" preview={false}   />
      </Flex>
      <Flex style={rightColumnStyle} vertical align="center" justify="center">
      <Outlet />
      </Flex>
    </Flex>
  );
};

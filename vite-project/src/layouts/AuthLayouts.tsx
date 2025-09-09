import { Flex, Image } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import leftImage from "../assets/illustration.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { getProfile } from "../store/actionCreators";
import { memoizedSelectAuthData } from "../services/selector";

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
  const {isAuthorized} = useSelector(memoizedSelectAuthData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getProfile());
    }
  });

  const lastUsl = localStorage.getItem("lastPath");

  if (isAuthorized) {
    const redirectPath = lastUsl || "/todo";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Flex style={container}>
      <Flex style={leftColumnStyle} vertical align="center" justify="center">
        <Image src={leftImage} alt="Illustration" preview={false} />
      </Flex>
      <Flex style={rightColumnStyle} vertical align="center" justify="center">
        <Outlet />
      </Flex>
    </Flex>
  );
};

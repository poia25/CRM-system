import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";
import router from "./routes/routes";

export const App = () => (
  <AntdApp>
    <RouterProvider router={router} />
  </AntdApp>
);

export default App;

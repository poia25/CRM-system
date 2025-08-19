import {  createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { PrivateRoute } from "./routes/privateRoute";
import TodoPage from "./pages/TodoListPage";
import ProfilePage from "./pages/ProfilePage";
import { UserPage } from "./pages/UserPage";
import UserProfilePage from "./pages/UserProfilePage";
import { AuthLayout } from "./layouts/AuthLayouts";
import LogIn from "./pages/LogIn";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import { App as AntdApp } from "antd";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />, 
      },
      {
        element: <PrivateRoute />, 
        children: [
          {
            path: 'todo',
            element: <TodoPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                element: <UserPage />,
              },
              {
                path: ':id',
                element: <UserProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LogIn />,
      },
      {
        path: 'register',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, 
  },
]);


export const App = () => (
  <>
   <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  </>
);

export default App;

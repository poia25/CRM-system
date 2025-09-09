import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { PrivateRoute } from './privateRoute';
import TodoPage from '../pages/TodoListPage';
import ProfilePage from '../pages/ProfilePage';
import { UserPage } from '../pages/UserPage';
import UserProfilePage from '../pages/UserProfilePage';
import { AuthLayout } from '../layouts/AuthLayouts';
import LogIn from '../pages/LogIn';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Основной лейаут приложения
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />, // Редирект с / на /todo
      },
      {
        element: <PrivateRoute />, // Защита всех дочерних маршрутов
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
    element: <AuthLayout />, // Лейаут для авторизации
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
    element: <NotFoundPage />, // Кастомная 404 страница
  },
]);

export default router;
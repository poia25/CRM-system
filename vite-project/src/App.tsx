import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { AuthLayout } from "./layouts/AuthLayouts.tsx";
import { RootState } from "./store/store.ts";
import { useSelector } from "react-redux";
import { Spin } from "antd";

function App() {
  const isLoadingAuth = useSelector(
    (state: RootState) => !!state.auth.authData.isLoading
  );
  const isLoadingProfile = useSelector(
    (state: RootState) => !!state.auth.profileData.isLoading
  );
  if (isLoadingAuth || isLoadingProfile === true) {
    return <Spin spinning fullscreen />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="todo" element={<TodoPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<LogIn />} />
            <Route path="register" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

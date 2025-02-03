import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import Sidebar from "./components/Sidebar.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { AuthLayout } from "./layouts/AuthLayouts.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<LogIn />} />
            <Route path="signin" element={<LogIn />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;

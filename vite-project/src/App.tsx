import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import Sidebar from "./components/Sidebar.tsx";
import LogIn from "./pages/LogIn.tsx";

function App() {
  return (
    <>
        <LogIn />
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

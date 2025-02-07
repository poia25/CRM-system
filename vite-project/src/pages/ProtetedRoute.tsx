import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from '../store/store';

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = useSelector((state: RootState) => state.auth.authState)

  return isAuthenticated ? (
    <div>
      <div>
        <Sidebar />
      </div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;

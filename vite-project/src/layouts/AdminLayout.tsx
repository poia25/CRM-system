import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';
import { Roles } from '../types/admin';

const AdminRoute = () => {
  const user = useSelector(
    (state: RootState) => state.auth.profileData.profile
  );
  if (!user?.roles.includes(Roles.ADMIN)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
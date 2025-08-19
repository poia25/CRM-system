import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
  roles?: string[];
}

export const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.authData.isAuthorizated
  );
  const location = useLocation();
    useEffect(() => {
    if (!location.pathname.startsWith('/auth')) {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location]);

  if (!isAuthorized) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/LoginPage" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
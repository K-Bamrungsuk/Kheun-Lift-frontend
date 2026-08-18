import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

function ProtectRoute() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" 
    replace 
    state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectRoute;

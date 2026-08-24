import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

function ProtectRoute() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace/>;
  }

  return <Outlet />;
}

export default ProtectRoute;

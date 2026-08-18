import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

function GuestRoute() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;

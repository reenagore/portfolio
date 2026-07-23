import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/useAdminAuth";

export default function RequireAdminAuth() {
  const { loading, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

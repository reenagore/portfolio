import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/useAdminAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading admin session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

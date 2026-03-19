import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import { useEffect } from "react";

function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (loading) {
      startLoading("Checking authentication...");
    } else {
      stopLoading();
    }
  }, [loading]);

  if(loading) <div className="min-h-screen"></div>
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
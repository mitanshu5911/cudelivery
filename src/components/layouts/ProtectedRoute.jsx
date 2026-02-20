import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();

  
  if (loading) {
    return <div className="w-full text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
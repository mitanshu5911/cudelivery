import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     alert("You are already logged in.");
  //   }
  // }, [isAuthenticated]);

  if (loading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default GuestRoute
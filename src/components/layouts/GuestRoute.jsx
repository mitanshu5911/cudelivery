import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = () => {
  const { isAuthenticated, loading , setAuthMessage} = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }


  if (isAuthenticated) {
    setAuthMessage("You are already logged in. Please logout first.");
    return <Navigate to="/home" replace />;
  }

  
  return <Outlet />;
};

export default GuestRoute;
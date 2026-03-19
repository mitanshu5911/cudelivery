import { useProfile } from "../../context/ProfileContext";
import { Navigate, Outlet } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import { useEffect } from "react";
import { vh } from "framer-motion";

function ProfileProtectedLayout() {
  const { profile, loading } = useProfile();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (loading) {
      startLoading("Preparing your dashboard...");
    } else {
      stopLoading();
    }
  }, [loading]);

  if(loading){
    <div className="min-h-[80vh]"></div>
  }
  if (!loading && !profile) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}

export default ProfileProtectedLayout;
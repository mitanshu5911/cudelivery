import React from "react";
import { useProfile } from "../../context/ProfileContext";
import { Navigate, Outlet } from "react-router-dom";

function RoleProtectedLayout({ allowedRoles }) {
  const { profile } = useProfile();

  
  if (!profile) return null;

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedLayout;
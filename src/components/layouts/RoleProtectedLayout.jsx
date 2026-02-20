import React from "react";
import { useProfile } from "../../context/ProfileContext";

function RoleProtectedLayout({allowedRoles}) {
  const { role } = useProfile();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedLayout;

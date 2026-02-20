import React from 'react'
import { useProfile } from '../../context/ProfileContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProfileProtectedLayout() {
    const {profile, loading} = useProfile();

    if(loading) return <div className="text-center mt-10">Loading profile...</div>

    if(!profile){
        return <Navigate to="/profile" replace />;
    }

  return <Outlet />;
}

export default ProfileProtectedLayout
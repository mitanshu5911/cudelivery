import { createContext, useContext, useState } from "react";
import { getMyProfile } from "../services/profileServices";
import { useNavigate } from "react-router-dom";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || null,
  );

  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
  setLoading(true);
  try {
    const data = await getMyProfile();
    setProfile(data.profile);
    localStorage.setItem("profile", JSON.stringify(data.profile));
    return true; // profile exists
  } catch (error) {
    if (error.response?.status === 404) {
      return false; // profile missing
    }
    throw error;
  } finally {
    setLoading(false);
  }
};

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem("profile");
  };

  const updateProfileContext = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
  };

  return(
    <ProfileContext.Provider
        value={{
            profile,
            role: profile?.role,
            isHosteller: profile?.role === "Hosteller",
            isDayScholar: profile?.role === "DayScholar",
            fetchProfile,
            updateProfileContext,
            clearProfile,
            loading,
        }}
    >   
    {children}

    </ProfileContext.Provider>
  )
};
export const useProfile = () => useContext(ProfileContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./ProfileContext";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchProfile, clearProfile } = useProfile();
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }

    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    

    setLoading(false);
  }, []);

  const login = async (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  setToken(token);
  setUser(user);
  setIsAuthenticated(true);

  try {
    const hasProfile = await fetchProfile();

    if (hasProfile) {
      navigate("/home");
    } else {
      navigate("/profile");
    }
  } catch (err) {
    console.error(err);
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    clearProfile();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
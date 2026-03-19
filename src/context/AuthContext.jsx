import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./ProfileContext";
import { jwtDecode } from "jwt-decode";
import { connectSocket, getSocket } from "../socket/socket";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [authMessage, setAuthMessage] = useState("");
  const navigate = useNavigate();
  const { fetchProfile, clearProfile } = useProfile();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(savedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setTimeout(() => {
          logout();
        }, 1000);
      }
    }

    if (savedUser && savedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

 useEffect(() => {
  if (!user?._id) return;

  const socket = connectSocket(); // 🔥 IMPORTANT

  socket.auth = { userId: user._id };

  socket.connect();

  socket.on("connect", () => {
    console.log("✅ Socket Connected:", socket.id);
  });

  return () => {
    socket.disconnect();
  };
}, [user]);

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
    const socket = getSocket();
    if (socket) {
      socket.disconnect();
    }

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

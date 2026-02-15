import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/authService";

function GoogleSuccess() {
  const navigate = useNavigate();
  const {login} = useAuth();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if(!token){
    // navigate("/login");
    return;
  };
 
  localStorage.setItem("token", token);

   


  const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        login(token, user);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        
      } catch (error) {
        console.error("Google login failed", error);
        navigate("/login");
      }
  }

  fetchUser();
}, [login,navigate]);

  return <p>Logging you in...</p>;
}

export default GoogleSuccess;
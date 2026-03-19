import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/authService";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";

function GoogleSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const { showToast } = useToast();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        showToast("error", "Google authentication failed");
        navigate("/login");
        return;
      }

      try {
        startLoading("Signing you in with Google...");

        localStorage.setItem("token", token);

        const user = await getCurrentUser();

      
        
          login(token, user);
        
       

      } catch (err) {
        console.error("Google login failed", err);

        stopLoading();
        showToast("error", "Login failed. Please try again");

        navigate("/login");
      }finally{
        stopLoading();
      }
    };

    handleGoogleLogin();

    
    return () => stopLoading();
  }, []);

  return <div className="min-h-[80vh]"></div>;
}

export default GoogleSuccess;
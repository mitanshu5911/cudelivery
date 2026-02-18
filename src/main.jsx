import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProfileProvider>
    </BrowserRouter>
  </StrictMode>,
);

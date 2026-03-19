import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
// import ConfirmModal from "./components/ui/ConfirmModal.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ConfirmProvider } from "./context/ConfirmContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <LoadingProvider>
      <ToastProvider>
        <ConfirmProvider>
          <ProfileProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ProfileProvider>
        </ConfirmProvider>
      </ToastProvider>
    </LoadingProvider>
  </BrowserRouter>,
  // </StrictMode>
);

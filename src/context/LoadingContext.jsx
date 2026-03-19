import { createContext, useContext, useState } from "react";
// import LoadingOverlay from "../components/ui/LoadingOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    show: false,
    message: "Loading..."
  });

  const startLoading = (message = "Loading...") => {
    setLoading({ show: true, message });
  };

  const stopLoading = () => {
    setLoading({ show: false, message: "" });
  };

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}
      <LoadingOverlay {...loading} />
    </LoadingContext.Provider>
  );
};
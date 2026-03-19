import { createContext, useContext, useState } from "react";
import AlertToast from "../components/ui/AlertToast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: ""
  });

  const showToast = (type, message) => {
    setToast({
      visible: true,
      type,
      message
    });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <AlertToast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
};
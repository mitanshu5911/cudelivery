import { createContext, useContext, useState } from "react";
import ConfirmModal from "../components/ui/ConfirmModal";

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: "",
    message: "",
    resolve: null,
  });

  const confirm = ({ title, message }) => {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        title,
        message,
        resolve,
      });
    });
  };

  const handleConfirm = () => {
    confirmState.resolve(true);
    setConfirmState({ ...confirmState, open: false });
  };

  const handleCancel = () => {
    confirmState.resolve(false);
    setConfirmState({ ...confirmState, open: false });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <ConfirmModal
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};
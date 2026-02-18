import React, { useEffect } from "react";

const Alert = ({ type = "info", message, onClose, duration = 5000 }) => {
  if (!message) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  const colors = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    info: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${colors[type]}`}>
      <div className="flex justify-between items-center">
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="font-bold text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const AlertToast = ({ type = "success", message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 right-6 z-50 min-w-75 max-w-sm px-5 py-4 rounded-2xl shadow-2xl flex items-start gap-3
          ${
            type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {type === "success" ? (
            <CheckCircle size={22} />
          ) : (
            <AlertCircle size={22} />
          )}

          <div className="flex-1">
            <p className="font-semibold text-sm capitalize">{type}</p>
            <p className="text-sm opacity-90">{message}</p>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToast;
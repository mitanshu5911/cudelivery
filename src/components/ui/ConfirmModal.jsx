import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="text-red-500" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-center text-gray-800">
              {title}
            </h2>

            {/* Message */}
            <p className="text-sm text-gray-500 text-center mt-2">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={onCancel}
                className="w-full py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="w-full py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
import { motion } from "framer-motion";
import { useConfirm } from "../../context/ConfirmContext";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import { LogOut } from "lucide-react";

const AccountActions = () => {
  const { confirm } = useConfirm();
  const { logout } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const handleLogout = async () => {
    const ok = await confirm({
      title: "Logout",
      message: "Are you sure you want to logout?",
    });

    if (!ok) return;

    startLoading("Logging out...");

    setTimeout(() => {
      logout();
      stopLoading();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Account
      </h2>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </motion.div>
  );
};

export default AccountActions;
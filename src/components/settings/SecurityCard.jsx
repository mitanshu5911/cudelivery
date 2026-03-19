import { useState } from "react";
import { motion } from "framer-motion";
import { changePassword } from "../../services/authService";
import { useToast } from "../../context/ToastContext";
import { Lock } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SecurityCard = () => {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStrength = (pwd) => {
    if (!pwd) return "";
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return "Weak";
    if (score === 2) return "Medium";
    return "Strong";
  };

  const strength = getStrength(form.newPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword) {
      return showToast("error", "All fields are required");
    }

    if (strength !== "Strong") {
      return showToast("error", "Password must be strong");
    }

    try {
      setLoading(true);

      await changePassword(form);

      showToast("success", "Password updated successfully 🔐");

      setForm({
        currentPassword: "",
        newPassword: "",
      });

    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-md space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Lock className="text-orange-500" size={18} />
        <h2 className="text-lg font-semibold text-gray-800">
          Security
        </h2>
      </div>

      <div className="relative">
        <input
          type={showCurrent ? "text" : "password"}
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <span
          className="absolute right-3 top-4 cursor-pointer text-orange-500"
          onClick={() => setShowCurrent(!showCurrent)}
        >
          {showCurrent ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      <div className="relative">
        <input
          type={showNew ? "text" : "password"}
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <span
          className="absolute right-3 top-4 cursor-pointer text-orange-500"
          onClick={() => setShowNew(!showNew)}
        >
          {showNew ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      {form.newPassword && (
        <p
          className={`text-sm ${
            strength === "Strong"
              ? "text-green-500"
              : strength === "Medium"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          Strength: {strength}
        </p>
      )}

      <button
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </motion.form>
  );
};

export default SecurityCard;
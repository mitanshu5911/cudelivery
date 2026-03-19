import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, verifyResetToken } from "../services/authService.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔐 VERIFY TOKEN WITH GLOBAL LOADING
  useEffect(() => {
    const checkToken = async () => {
      try {
        startLoading("Verifying reset link...");

        await verifyResetToken(token);

        // optional smooth UX delay
        setTimeout(() => {
          stopLoading();
        }, 800);

      } catch {
        stopLoading();
        setError("Invalid or expired token");
      }
    };

    checkToken();
  }, [token]);

  // 🔐 PASSWORD STRENGTH
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

  const strength = getStrength(password);
  const passwordMatch =
    password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) return;

    try {
      setSaving(true);
      startLoading("Updating password...");

      await resetPassword(token, password);

      setMessage("Password reset successful 🎉");

      setTimeout(() => {
        stopLoading();
        navigate("/login");
      }, 1200);

    } catch (error) {
      stopLoading();
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 
   ">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white backdrop-blur-xl 
        border border-white/30 rounded-3xl shadow-2xl p-8"
      >

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Reset Password 🔐
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your new password below
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-600 text-sm text-center mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* PASSWORD */}
          <div className="relative">
            <IoMdKey className="absolute left-3 top-4.5 text-orange-500" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border 
              border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="absolute right-3 top-4.5 cursor-pointer text-orange-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* STRENGTH */}
          {password && (
            <p className={`text-sm ${
              strength === "Strong"
                ? "text-green-500"
                : strength === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }`}>
              Strength: {strength}
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <IoMdKey className="absolute left-3 top-4 text-orange-500" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border 
              border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <span
              className="absolute right-3 top-4 cursor-pointer text-orange-500"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* MATCH */}
          {confirmPassword && (
            <p className={`text-sm ${
              passwordMatch ? "text-green-500" : "text-red-500"
            }`}>
              {passwordMatch
                ? "Passwords match ✅"
                : "Passwords do not match ❌"}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={!passwordMatch || saving}
            className={`w-full py-3 rounded-xl font-semibold text-white transition 
            ${
              !passwordMatch || saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-orange-500 to-orange-600 hover:scale-[1.02]"
            }`}
          >
            {saving ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
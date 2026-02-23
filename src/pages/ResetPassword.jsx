import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, verifyResetToken } from "../services/authService.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checktoken = async () => {
      try {
        await verifyResetToken(token);
        setLoading(false);
      } catch (error) {
        setError("Invalid or expired token");
        setLoading(false);
      }
    };
    checktoken();
  }, [token]);

  const passwordMatch =
    password && confirmPassword && password === confirmPassword;

  const checkPwdStrength = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 8) return "short";
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 1) return "Weak";
    if (strength === 2) return "Medium";
    return "Strong";
  };

  const checkPoint = () => {
    let strength = checkPwdStrength(password);
    setSuccess("");
    if (strength === "Weak") {
      setError("Password is Weak");
      return false;
    } else if (strength === "Medium") {
      setError("Password is Medium");
      return false;
    } else if (strength === "") {
      setError("Please enter password");
      return false;
    } else if (strength === "short") {
      setError("Password must be 8-14 chars");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) return;

    if (!checkPoint()) {
      return;
    }

    try {
      setSaving(true);
      await resetPassword(token, password);

      setMessage("Password reset successful. Redirecting...");
      setError("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("");
      setError(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Verifying reset Link.....;
      </p>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {message && (
          <p className="text-green-500 text-sm text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative w-full border-b-2 border-orange-300 text-xl mt-3 flex items-center">
            <span className="px-3 text-orange-500">
              <IoMdKey />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className="flex-1 py-2 pr-10 outline-none bg-transparent"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-2 cursor-pointer text-orange-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="relative w-full border-b-2 border-orange-300 text-xl mt-3 flex items-center">
            <span className="px-3 text-orange-500">
              <IoMdKey />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="flex-1 py-2 pr-10 outline-none bg-transparent"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-2 cursor-pointer text-orange-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {confirmPassword && (
            <p
              className={`text-sm ${
                passwordMatch ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}

          <button
            type="submit"
            disabled={!passwordMatch || saving}
            className={`w-full py-2 rounded mt-4 text-white ${
              !passwordMatch || saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {saving ? "Saving..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

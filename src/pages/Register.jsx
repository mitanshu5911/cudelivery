import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdKey } from "react-icons/io";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rmbrPassword, setRmbrPassword] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

  const checkEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkPoint = () => {
    if (!checkEmail(email)) {
      setError("Invalid Email");
      return false;
    }

    const strength = checkPwdStrength(password);
    setSuccess("");

    if (strength === "Weak") return setError("Password is Weak"), false;
    if (strength === "Medium") return setError("Password is Medium"), false;
    if (strength === "") return setError("Enter password"), false;
    if (strength === "short")
      return setError("Password must be 8-14 chars"), false;

    if (!rmbrPassword) {
      setError("Please confirm remember password");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!checkPoint()) return;

    try {
      const res = await registerUser({ name, email, password });
      setSuccess(res.message);
      setError("");
    } catch (err) {
      setSuccess("");
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex justify-center items-center pt-10 px-3">

      <div className="w-full max-w-5xl bg-white flex rounded-2xl overflow-hidden shadow-xl">

    
        <div className="hidden md:flex w-1/2 relative">

        
          <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-orange-700" />

          
          <div className="relative z-10 p-10 text-white flex flex-col justify-center">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              Welcome to CuDelivery 🚀
            </motion.h1>

            <p className="mt-3 text-orange-100">
              Your campus delivery partner
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <p>✔ Fast deliveries inside campus</p>
              <p>✔ Earn as a DayScholar</p>
              <p>✔ Smart request system</p>
            </div>

          </div>
        </div>

        
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-8">

          <h2 className="text-2xl">Welcome</h2>

          {error && (
            <p className="text-red-500 text-sm font-bold mt-2">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm font-bold mt-2">{success}</p>
          )}

          <form
            onSubmit={handleRegister}
            className="w-full px-6 md:px-12 flex flex-col items-center"
          >
          
            <div className="flex w-full border-b-2 border-orange-300 m-3">
              <span className="p-3 text-orange-500">
                <FiUser />
              </span>
              <input
                type="text"
                className="flex-1 py-1 outline-none"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

        
            <div className="flex w-full border-b-2 border-orange-300 m-3">
              <span className="p-3 text-orange-500">
                <HiOutlineMail />
              </span>
              <input
                type="text"
                className="flex-1 py-1 outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            
            <div className="relative w-full border-b-2 border-orange-300 flex items-center mt-3">
              <span className="p-3 text-orange-500">
                <IoMdKey />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 py-1 pr-10 outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="absolute right-2 cursor-pointer text-orange-500"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            
            <div className="flex w-full items-center mt-3 text-sm">
              <input
                type="checkbox"
                onChange={() => setRmbrPassword(!rmbrPassword)}
              />
              <span className="ml-2">Remember Password</span>
            </div>

            
            <button className="w-2/3 h-10 bg-orange-600 mt-4 text-white rounded-xl hover:bg-orange-700 transition">
              Sign Up
            </button>
          </form>

          <div className="mt-4">
            <p>
              Already Registered?{" "}
              <span
                className="text-orange-600 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
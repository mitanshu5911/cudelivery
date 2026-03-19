import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdKey } from "react-icons/io";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import googleLogo from "../assets/googleLogo.png";
import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const url = import.meta.env.VITE_API_BASE_URL;
  const handleGoogleLogin = () => {
    window.location.href = `${url}/api/auth/google`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let formData = {
        email,
        password,
      };
      let res = await loginUser(formData);
      const user = {
        _id: res._id,
        name: res.name,
        email: res.email,
      };
      console.log("Login response:", user);
      login(res.token, user);
      setSuccess(res.message);
      setError("");
    } catch (err) {
      setSuccess("");

      if (err.response?.status === 500) {
        setError("Server problem");
      } else {
        setError(err.response?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex justify-center items-center px-3">
      <div className="w-full max-w-5xl  my-5 rounded-xl flex justify-center overflow-hidden">
        <div className="hidden md:flex w-1/2 relative overflow-hidden">


  <div className="absolute inset-0 bg-linear-to-br from-orange-500 via-orange-600 to-orange-700" />

  
  <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10" />
  <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl bottom-10 right-10" />

  
  <div className="relative z-10 flex flex-col justify-center px-12 text-white">

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold leading-tight"
    >
      Campus Delivery
      <br />
      Made Effortless 🚀
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 text-orange-100"
    >
      Connect with day scholars to get your items delivered quickly,
      safely, and hassle-free.
    </motion.p>

    
    <div className="mt-8 space-y-4">

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <Package size={20} />
        <span>Request items in seconds</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3"
      >
        <Truck size={20} />
        <span>Fast campus delivery</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3"
      >
        <ShieldCheck size={20} />
        <span>Secure & trusted system</span>
      </motion.div>

    </div>

    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-12 text-sm text-orange-200"
    >
      Trusted by students across campus 💡
    </motion.div>

  </div>
</div>
           <div className="right w-full md:w-1/2 bg-white py-5 flex flex-col items-center justify-center">
          <h3 className="text-3xl my-5">Welcome Back</h3>

          {error && (
            <p className="text-red-500 text-sm font-bold mt-2">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm font-bold mt-2">{success}</p>
          )}

          <form
            action=""
            onSubmit={handleLogin}
            className="w-full px-8 md:px-16 flex flex-col items-center justify-center"
          >
            <div className="flex w-full border-b-2 border-orange-300 overflow-hidden text-xl m-3">
              <span className="flex items-center justify-center px-3 text-orange-500">
                <HiOutlineMail />
              </span>
              <input
                type="text"
                name="eamil"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-2 outline-none"
                placeholder="Email"
                autoComplete="email"
                required
              />
            </div>
            <div className="relative w-full border-b-2 border-orange-300 text-xl mt-3 flex items-center">
              <span className="px-3 text-orange-500">
                <IoMdKey />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 py-2 pr-10 outline-none bg-transparent"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <span
                className="absolute right-2 cursor-pointer text-orange-500"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <span
              className="w-full cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
            <button
              type="submit"
              className="w-2/3 h-10 bg-orange-600  mt-3 text-white cursor-pointer rounded-xl hover:border-2 hover:border-orange-600 hover:bg-white hover:text-orange-600"
            >
              Login
            </button>
            <div className="font-bold my-2 text-orange-600">or</div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-12 h-12 flex items-center justify-center rounded-full
             bg-white border border-gray-300
             hover:bg-gray-100 transition"
            >
              <img
                src={googleLogo}
                alt="Google"
                className="w-6 h-6 object-contain"
              />
            </button>
          </form>

          <div className="m-2 flex justify-center w-full">
            <p>New User?</p>
            <span
              className="text-orange-600 underline cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              click Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


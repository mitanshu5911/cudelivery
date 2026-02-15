import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdKey } from "react-icons/io";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import  googleLogo  from "../assets/googleLogo.png";
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
    window.location.href = `${url}/auth/google`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let formData = {
        email,
        password,
      };
      let res = await loginUser(formData);
      login(res.token, res.user);
      setSuccess(res.message);
      setError("");
      navigate("/home");
    } catch (err) {
      setSuccess("");

      if (err.response?.status === 500) {
        setError("Server problem");
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-8 ">
      <div className="w-full max-w-5xl  my-5 rounded-xl flex justify-center overflow-hidden">
        <div className="hidden md:block left w-1/2 bg-orange-500 "></div>

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
            <span className="w-full justify-baseline">Forgot password?</span>

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

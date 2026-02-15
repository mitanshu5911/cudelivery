import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdKey } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "../services/authService";
import registerImage from "../assets/register.jpg";
import { useNavigate } from "react-router-dom";
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

    if (regex.test(email)) {
      return true;
    }
    return false;
  };

  const checkPoint = () => {
    if (!checkEmail(email)) {
      setError("Invalid Email");
      return false;
    }
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
    if (rmbrPassword == false) {
      setError("Check Remember Password");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!checkPoint()) {
      return;
    }

    try {
      let formData = {
        name,
        email,
        password,
      };
      let res = await registerUser(formData);
      setSuccess(res.message);
      setError("");
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
    <div className="w-full flex justify-center items-center p-4 md:p-4">
      <div className="w-full max-w-5xl  bg-white flex rounded-xl hover:shadow-2xl hover:shadow-neutral-500 ">
        {/* Left Section (Desktop only) */}
        <div
          className="hidden md:block  w-1/2 border-r border-gray-200 items-center justify-center bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${registerImage})`,
          }}
        ></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col  items-center justify-center mt-10 py-4 md:py-2 ">
          <h2 className=" text-2xl">Welcome</h2>

          {error && (
            <p className="text-red-500 text-sm font-bold mt-2">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm font-bold mt-2">{success}</p>
          )}
          <form
            action=""
            onSubmit={handleRegister}
            className="w-full px-8 md:px-16 flex flex-col items-center justify-center"
          >
            <div className="flex  w-full  border-b-2 border-orange-300  overflow-hidden text-xl m-3">
              <span className="flex items-center justify-center px-3 text-orange-500">
                <FiUser />
              </span>
              <input
                type="text"
                className="flex-1 py-2 outline-none"
                placeholder="Full Name"
                value={name}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex  w-full  border-b-2 border-orange-300  overflow-hidden text-xl m-3">
              <span className="flex items-center justify-center px-3 text-orange-500">
                <HiOutlineMail />
              </span>
              <input
                type="text"
                className="flex-1 py-2 outline-none"
                placeholder="Email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={14}
              />

              <span
                className="absolute right-2 cursor-pointer text-orange-500"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="flex w-full items-baseline">
              <input
                type="checkbox"
                onChange={() => setRmbrPassword(!rmbrPassword)}
              />{" "}
              &nbsp; Remember Password
            </div>
            <button
              type="submit"
              className="w-2/3 h-10 bg-orange-600 my-3 text-white cursor-pointer rounded-xl hover:border-2 hover:border-orange-600 hover:bg-white hover:text-orange-600"
            >
              Sign Up
            </button>
          </form>

          <div className="mb-5 flex justify-center w-full">
            <p>If aleary Registed?</p>
            <span className="text-orange-600 underline cursor-pointer" onClick={()=>{navigate('/login')}}>
              click Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

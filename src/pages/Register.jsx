import React from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdKey } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "../services/authService";
import registerImage from "../assets/register.jpg"
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rmbrPassword, setRmbrPassword] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!checkEmail(email)) {
      setError("Invalid Email");
      return;
    }
    let strength = checkPwdStrength(password);
    if (strength === "Weak") {
      setError("Password is Weak");
      return;
    } else if (strength === "Medium") {
      setError("Password is Medium");
      return;
    } else if (strength === "") {
      setError("Please enter password");
      return;
    } else if (strength === "short") {
      setError("Password must be 8-14 chars");
      return;
    }
    if(rmbrPassword==false){
      setError("Check Remember Password");
      return;
    }
    let formData = {
      name,
      email,
      password,
    };
    let res = await registerUser(formData);
    alert(res.message);
  };
  return (
    <div className="w-full flex justify-center items-center p-4 md:p-4">
      <div className="w-full max-w-5xl bg-white flex rounded-xl hover:shadow-2xl hover:shadow-neutral-500 ">
        {/* Left Section (Desktop only) */}
        <div className="hidden md:block  w-1/2  items-center justify-center bg-center bg-no-repeat bg-contain"
          style={{
    backgroundImage: `url(${registerImage})`,
  }}
        >
          
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col  items-center justify-center my-5 ">
          <h2 className=" text-2xl">Register Here</h2>

          <p className="text-red-500 text-sm my-4">{error}</p>

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
              <input type="checkbox" onChange={()=>setRmbrPassword(!rmbrPassword)}/> &nbsp; Remember Password
            </div>
            <button
              type="submit"
              className="w-2/3 h-10 bg-orange-600 my-3 text-white cursor-pointer rounded-xl hover:border-2 hover:border-orange-600 hover:bg-white hover:text-orange-600"
            >
              Sign Up
            </button>
          </form>

          <div className="m-5 flex justify-center w-full">
            <p>If aleary Registed?</p>
            <span className="text-orange-600 underline cursor-pointer">
              click Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

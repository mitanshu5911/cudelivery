import React, {  useState } from 'react'
import api from '../utils/api.js';
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(loading) return;
        try {
            setLoading(true);
             setError("");
      setMessage("");
            await api.post("/auth/forgot-password", {email});
            setMessage("Password reset link sent to your email");
            setError("");
        } catch (error) {
            setMessage("");
            setError(error.response?.data?.message || "Something went wrong"); 
        }finally{
          setLoading(false);
        }
    }
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your registered email to receive reset link
        </p>

        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}

        {message && (
          <p className="mt-3 text-sm text-green-600 text-center">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 rounded-lg text-white font-medium transition 
              ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p
          className="text-orange-600 text-center mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>

  )
}

export default ForgotPassword
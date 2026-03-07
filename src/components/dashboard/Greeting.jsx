import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/dayscholarGreeting.png";

const Greeting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full p-0 md:px-6">

      <div
        className="relative w-full rounded-none md:rounded-2xl md:shadow-2xl overflow-hidden
        bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >

        <div className="flex flex-col md:flex-row  justify-between w-full p-6 md:p-12 min-h-50 md:min-h-65">

          
          <div className="z-10 max-w-xl">

            <h1 className="text-xl md:text-4xl font-bold text-gray-800">
              Hello {user?.name || "User"} 👋
            </h1>

            <p className="text-gray-600 mt-2 md:text-lg">
              Ready for your next delivery?
            </p>

            <button
              onClick={() => navigate("/pending_requests")}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              View Requests
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Greeting;
import { useAuth } from "../../../context/AuthContext";
import bgImage from "../../../assets/hostellerDashboard.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Greeting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const name = user?.name || "Hosteller";

  return (
    <div
      className="w-full h-57.5 sm:h-65 md:h-75 lg:h-82.5  md:rounded-3xl overflow-hidden relative mb-8 md:shadow-2xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative h-full flex flex-col justify-between px-6 sm:px-8 md:px-12 py-6 md:py-8">
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            Welcome, <span className="text-orange-600">{name}</span> 👋
          </h1>

          <p className="text-gray-700 mt-2 md:mt-3 text-xs sm:text-sm md:text-lg">
            Get your essentials delivered by DayScholars.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-3 sm:gap-4"
        >
          <button
            onClick={() => navigate("/create_request")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-[1.04]"
          >
            Create Request
          </button>

          <button
            onClick={() => navigate("/my_requests")}
            className="bg-white text-gray-800 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-[1.04]"
          >
            My Requests
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Greeting;
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const ProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate("/profile")}
      className="bg-white/40 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow cursor-pointer transition"
    >
      <div className="flex items-center gap-3 mb-2">
        <User className="text-orange-500" size={18} />
        <h2 className="font-semibold text-lg text-gray-800">
          Profile
        </h2>
      </div>

      <p className="text-gray-700">{user?.name}</p>
      <p className="text-gray-500 text-sm">{user?.email}</p>
    </motion.div>
  );
};

export default ProfileCard;